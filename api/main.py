import requests
import json
from bs4 import BeautifulSoup
import re
from urllib.parse import urljoin, urlparse
import time
import os

class LLMScrapingAgent:
    def __init__(self, api_key, site_url=None, site_name=None):
        """
        Initialize the LLM Scraping Agent.
        
        Args:
            api_key (str): OpenRouter API key
            site_url (str, optional): Your site URL for OpenRouter rankings
            site_name (str, optional): Your site name for OpenRouter rankings
        """
        self.api_key = api_key
        self.site_url = site_url
        self.site_name = site_name
        self.model = "bytedance-research/ui-tars-72b:free"  # Default model, can be changed
        self.rate_limit_delay = 1  # Delay between requests in seconds
        
    def _fetch_webpage_content(self, url):
        """
        Fetch the HTML content of a webpage.
        
        Args:
            url (str): URL of the webpage to scrape
            
        Returns:
            str: HTML content of the webpage
        """
        try:
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
            }
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
            return response.text
        except Exception as e:
            print(f"Error fetching webpage: {e}")
            return None

    def _extract_text_from_html(self, html_content, url):
        """
        Extract clean text from HTML content.
        
        Args:
            html_content (str): HTML content of the webpage
            url (str): URL of the webpage (needed for resolving relative URLs)
            
        Returns:
            dict: Extracted text content organized by HTML elements
        """
        if not html_content:
            return {}
        
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Remove script and style elements
        for script in soup(["script", "style"]):
            script.extract()
        
        # Extract metadata
        meta_data = {}
        title = soup.title.string if soup.title else ""
        meta_data["title"] = title.strip() if title else ""
        
        meta_tags = soup.find_all("meta")
        for tag in meta_tags:
            if tag.get("name") and tag.get("content"):
                meta_data[tag.get("name")] = tag.get("content")
            elif tag.get("property") and tag.get("content"):
                meta_data[tag.get("property")] = tag.get("content")
        
        # Extract main content
        main_content = {}
        
        # Headers
        headers = {}
        for i in range(1, 7):
            h_tags = soup.find_all(f'h{i}')
            if h_tags:
                headers[f'h{i}'] = [tag.get_text(strip=True) for tag in h_tags]
        
        main_content["headers"] = headers
        
        # Paragraphs
        paragraphs = soup.find_all('p')
        main_content["paragraphs"] = [p.get_text(strip=True) for p in paragraphs if p.get_text(strip=True)]
        
        # Lists
        lists = {}
        ul_tags = soup.find_all('ul')
        ol_tags = soup.find_all('ol')
        
        lists["unordered"] = []
        for ul in ul_tags:
            li_items = ul.find_all('li')
            if li_items:
                lists["unordered"].append([li.get_text(strip=True) for li in li_items])
        
        lists["ordered"] = []
        for ol in ol_tags:
            li_items = ol.find_all('li')
            if li_items:
                lists["ordered"].append([li.get_text(strip=True) for li in li_items])
        
        main_content["lists"] = lists
        
        # Links
        links = []
        for a_tag in soup.find_all('a', href=True):
            href = a_tag['href']
            text = a_tag.get_text(strip=True)
            if href and not href.startswith('#') and not href.startswith('javascript:'):
                # Convert relative URLs to absolute
                if not bool(urlparse(href).netloc):
                    base_url = urlparse(url).scheme + "://" + urlparse(url).netloc
                    href = urljoin(base_url, href)
                links.append({"text": text, "url": href})
        
        main_content["links"] = links
        
        # Extract all text for better context
        all_text = soup.get_text(separator=' ', strip=True)
        main_content["all_text"] = all_text
        
        return {
            "meta_data": meta_data,
            "main_content": main_content
        }

    def _extract_job_details(self, extracted_content, url):
        """
        Extract job details from the extracted content.
        
        Args:
            extracted_content (dict): Extracted webpage content
            url (str): URL of the webpage
            
        Returns:
            dict: Job details with title, description, location, salary, and job ID
        """
        # Initialize job details with NULL values
        job_details = {
            "job_title": "NULL",
            "job_description": "NULL",
            "job_location": "NULL",
            "job_salary": "NULL",
            "job_id": "NULL",
            "basic_qualifications": "NULL",
            "preferred_qualifications": "NULL"
        }
        
        # Try to extract job ID from URL
        url_match = re.search(r'jobs?/(\d+)', url)
        if url_match:
            job_details["job_id"] = url_match.group(1)
        
        # Extract job title from meta title or h1
        meta_title = extracted_content.get("meta_data", {}).get("title", "")
        if meta_title:
            job_details["job_title"] = meta_title.split(" | ")[0].strip()
        elif "headers" in extracted_content.get("main_content", {}) and "h1" in extracted_content["main_content"]["headers"]:
            job_details["job_title"] = extracted_content["main_content"]["headers"]["h1"][0]
        
        # Extract full job description from all available text
        all_text = extracted_content.get("main_content", {}).get("all_text", "")
        if all_text:
            job_details["job_description"] = all_text
        else:
            # Fallback to paragraphs and lists if all_text is not available
            description_parts = []
            
            # Add paragraphs
            if "paragraphs" in extracted_content.get("main_content", {}):
                description_parts.extend(extracted_content["main_content"]["paragraphs"])
            
            # Add lists
            if "lists" in extracted_content.get("main_content", {}):
                for list_type in ["unordered", "ordered"]:
                    for list_items in extracted_content["main_content"]["lists"].get(list_type, []):
                        description_parts.append(" • " + " • ".join(list_items))
            
            if description_parts:
                job_details["job_description"] = "\n\n".join(description_parts)
        
        # Use LLM to extract specific details from the content
        structured_data = self._generate_job_structured_data(extracted_content, url)
        
        # Update job details with LLM-extracted information
        if structured_data:
            if "job_title" in structured_data and structured_data["job_title"] != "NULL":
                job_details["job_title"] = structured_data["job_title"]
            
            if "job_description" in structured_data and structured_data["job_description"] != "NULL":
                job_details["job_description"] = structured_data["job_description"]
            
            if "job_location" in structured_data and structured_data["job_location"] != "NULL":
                job_details["job_location"] = structured_data["job_location"]
            
            if "job_salary" in structured_data and structured_data["job_salary"] != "NULL":
                job_details["job_salary"] = structured_data["job_salary"]
            
            if "job_id" in structured_data and structured_data["job_id"] != "NULL":
                job_details["job_id"] = structured_data["job_id"]
                
            if "basic_qualifications" in structured_data and structured_data["basic_qualifications"] != "NULL":
                job_details["basic_qualifications"] = structured_data["basic_qualifications"]
                
            if "preferred_qualifications" in structured_data and structured_data["preferred_qualifications"] != "NULL":
                job_details["preferred_qualifications"] = structured_data["preferred_qualifications"]
        
        return job_details

    def _generate_job_structured_data(self, extracted_content, url):
        """
        Use an LLM to extract job details from the content.
        
        Args:
            extracted_content (dict): Extracted webpage content
            url (str): URL of the webpage
            
        Returns:
            dict: Structured job data
        """
        # Prepare prompt for the LLM
        prompt = f"""
        I have extracted content from a job posting webpage at {url}.
        
        Please extract ONLY the following information from the content:
        1. job_title: The title of the job position
        2. job_description: The FULL job description (include all paragraphs, not just a summary)
        3. job_location: The location of the job
        4. job_salary: The salary range or compensation information
        5. job_id: Any job ID or reference number
        6. basic_qualifications: The BASIC QUALIFICATIONS or MINIMUM REQUIREMENTS section
        7. preferred_qualifications: The PREFERRED QUALIFICATIONS or NICE TO HAVE section
        
        For any field where information is not available, use the value "NULL".
        
        Here's the extracted content:
        {json.dumps(extracted_content, indent=2)}
        
        Return ONLY a valid JSON object with these 7 fields. Do not include any explanation or text outside the JSON structure.
        """
        
        # Make request to the LLM API
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        
        if self.site_url:
            headers["HTTP-Referer"] = self.site_url
        
        if self.site_name:
            headers["X-Title"] = self.site_name
        
        data = {
            "model": self.model,
            "messages": [
                {"role": "user", "content": prompt}
            ]
        }
        
        try:
            response = requests.post(
                url="https://openrouter.ai/api/v1/chat/completions",
                headers=headers,
                data=json.dumps(data),
                timeout=30
            )
            response.raise_for_status()
            
            result = response.json()
            content = result.get("choices", [{}])[0].get("message", {}).get("content", "")
            
            # Extract JSON from the content
            json_match = re.search(r'```json\s*([\s\S]*?)\s*```', content)
            if json_match:
                content = json_match.group(1)
            
            # Try to parse the JSON
            try:
                structured_data = json.loads(content)
                return structured_data
            except json.JSONDecodeError:
                # If can't parse JSON, return the raw content
                return {"error": "Failed to parse JSON response"}
            
        except Exception as e:
            print(f"Error making LLM request: {e}")
            return {"error": str(e)}

    def scrape_job_posting(self, url):
        """
        Scrape a job posting webpage and extract job details.
        
        Args:
            url (str): URL of the job posting webpage
            
        Returns:
            dict: Job details with title, description, location, salary, and job ID
        """
        # Step 1: Fetch webpage content
        html_content = self._fetch_webpage_content(url)
        if not html_content:
            return {
                "job_title": "NULL",
                "job_description": "NULL",
                "job_location": "NULL",
                "job_salary": "NULL",
                "job_id": "NULL",
                "basic_qualifications": "NULL",
                "preferred_qualifications": "NULL",
                "error": "Failed to fetch webpage content"
            }
        
        # Step 2: Extract text and other elements from HTML
        extracted_content = self._extract_text_from_html(html_content, url)
        
        # Step 3: Extract job details
        job_details = self._extract_job_details(extracted_content, url)
        
        # Step 4: Add metadata
        result = {
            "url": url,
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            **job_details
        }
        
        return result
    
    def batch_scrape_jobs(self, urls, output_file=None):
        """
        Scrape multiple job posting webpages and optionally save results to a file.
        
        Args:
            urls (list): List of job posting URLs to scrape
            output_file (str, optional): Path to save results
            
        Returns:
            list: List of job details for each URL
        """
        results = []
        
        for url in urls:
            print(f"Scraping job posting at {url}...")
            result = self.scrape_job_posting(url)
            results.append(result)
            
            # Apply rate limiting
            time.sleep(self.rate_limit_delay)
        
        # Save results if output file is specified
        if output_file:
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(results, f, indent=2, ensure_ascii=False)
            print(f"Results saved to {output_file}")
        
        return results

# Example usage
if __name__ == "__main__":
    # Replace with your actual API key
    API_KEY = "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"       
    SITE_URL = "hirewave.online"  # Optional
    SITE_NAME = "hirewave"  # Optional
    
    scraper = LLMScrapingAgent(API_KEY, SITE_URL, SITE_NAME)
    
    # Single job posting scraping
    result = scraper.scrape_job_posting("https://www.amazon.jobs/en/jobs/2935068/software-dev-engineer-i-amazon-university-talent-acquisition")
    print(json.dumps(result, indent=2))
    
    # Batch job posting scraping
    urls = [
        "https://www.amazon.jobs/en/jobs/2935068/software-dev-engineer-i-amazon-university-talent-acquisition",
        "https://www.google.com/about/careers/applications/jobs/results/75226763403109062-microled-display-product-engineer",
        "https://jobs.infineon.com/careers/job/563808957549560?domain=infineon.com#!source=400",
        "https://recruiterflow.com/shopflo/jobs/31"
    ]
    
    results = scraper.batch_scrape_jobs(urls, "job_scraping_results.json")