import React, { useState, useRef, useEffect } from 'react';
import { 
  FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaLink, 
  FaImage, FaTable, FaHeading, FaParagraph, FaAlignLeft, 
  FaAlignCenter, FaAlignRight, FaAlignJustify, FaIndent, FaOutdent
} from 'react-icons/fa';
import Popup from '../Popup/Popup';
import InputPopup from '../Popup/InputPopup';
import './SimpleRichTextEditor.css';

const SimpleRichTextEditor = ({ value, onChange, placeholder }) => {
  const editorRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [popup, setPopup] = useState({ isOpen: false, message: '', type: 'info' });
  const [inputPopup, setInputPopup] = useState({
    isOpen: false,
    title: '',
    type: 'text',
    placeholder: '',
    initialValue: '',
    onSubmit: () => {}
  });

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value || '';
    }
  }, []);

  const handleContentChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const showPopup = (message, type = 'info') => {
    setPopup({ isOpen: true, message, type });
  };

  const closePopup = () => {
    setPopup({ ...popup, isOpen: false });
  };

  const execCommand = (command, showUI = false, value = null) => {
    document.execCommand(command, showUI, value);
    handleContentChange();
  };

  // Text formatting
  const handleBold = () => execCommand('bold');
  const handleItalic = () => execCommand('italic');
  const handleUnderline = () => execCommand('underline');
  
  // Lists
  const handleBulletList = () => execCommand('insertUnorderedList');
  const handleNumberedList = () => execCommand('insertOrderedList');
  
  // Alignment
  const handleAlignLeft = () => execCommand('justifyLeft');
  const handleAlignCenter = () => execCommand('justifyCenter');
  const handleAlignRight = () => execCommand('justifyRight');
  const handleAlignJustify = () => execCommand('justifyFull');
  
  // Indentation
  const handleIndent = () => execCommand('indent');
  const handleOutdent = () => execCommand('outdent');
  
  // Headings and paragraph
  const handleHeading = (level) => {
    execCommand('formatBlock', false, `h${level}`);
  };
  
  const handleParagraph = () => {
    execCommand('formatBlock', false, 'p');
  };
  
  // Links
  const handleLink = () => {
    const selection = document.getSelection();
    const selectedText = selection.toString();
    
    if (!selectedText) {
      showPopup('Please select text to create a link', 'warning');
      return;
    }
    
    setInputPopup({
      isOpen: true,
      title: 'Enter URL:',
      type: 'text',
      placeholder: 'https://example.com',
      initialValue: '',
      onSubmit: (url) => {
        if (url) {
          setInputPopup({
            isOpen: true,
            title: 'Enter link text:',
            type: 'text',
            placeholder: 'Link text',
            initialValue: selectedText,
            onSubmit: (linkText) => {
              // Replace selection with custom link
              const linkHtml = `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
              execCommand('insertHTML', false, linkHtml);
            }
          });
        }
      }
    });
  };

  // Images
  const handleImage = () => {
    setInputPopup({
      isOpen: true,
      title: 'Enter image URL:',
      type: 'text',
      placeholder: 'https://example.com/image.jpg',
      initialValue: '',
      onSubmit: (url) => {
        if (url) {
          setInputPopup({
            isOpen: true,
            title: 'Enter image width:',
            type: 'text',
            placeholder: 'e.g., 300px or 100%',
            initialValue: 'auto',
            onSubmit: (width) => {
              setInputPopup({
                isOpen: true,
                title: 'Enter image height:',
                type: 'text',
                placeholder: 'e.g., 200px or auto',
                initialValue: 'auto',
                onSubmit: (height) => {
                  setInputPopup({
                    isOpen: true,
                    title: 'Enter image alt text:',
                    type: 'text',
                    placeholder: 'Description of the image',
                    initialValue: '',
                    onSubmit: (alt) => {
                      const imgHtml = `<img src="${url}" alt="${alt}" style="width: ${width}; height: ${height};" class="editor-image" />`;
                      execCommand('insertHTML', false, imgHtml);
                    }
                  });
                }
              });
            }
          });
        }
      }
    });
  };

  // Tables
  const handleTable = () => {
    setInputPopup({
      isOpen: true,
      title: 'Enter number of rows:',
      type: 'number',
      placeholder: '3',
      initialValue: '3',
      onSubmit: (rows) => {
        setInputPopup({
          isOpen: true,
          title: 'Enter number of columns:',
          type: 'number',
          placeholder: '3',
          initialValue: '3',
          onSubmit: (cols) => {
            const numRows = parseInt(rows, 10);
            const numCols = parseInt(cols, 10);
            
            if (!isNaN(numRows) && !isNaN(numCols) && numRows > 0 && numCols > 0) {
              let tableHTML = '<table class="editor-table"><tbody>';
              
              for (let i = 0; i < numRows; i++) {
                tableHTML += '<tr>';
                for (let j = 0; j < numCols; j++) {
                  tableHTML += '<td>Cell</td>';
                }
                tableHTML += '</tr>';
              }
              
              tableHTML += '</tbody></table>';
              
              execCommand('insertHTML', false, tableHTML);
            }
          }
        });
      }
    });
  };

  return (
    <>
      <div className="bg-[#0f172a] rounded-lg border border-[#334155] overflow-hidden">
        <div className="bg-[#1e293b] p-2 border-b border-[#334155] flex flex-wrap gap-2">
          {/* Text formatting */}
          <div className="flex gap-1 mr-2 border-r border-[#334155] pr-2">
            <button 
              type="button"
              onClick={handleBold}
              className="p-2 rounded hover:bg-[#475569]"
              title="Bold"
            >
              <FaBold className="text-[#94a3b8]" />
            </button>
            <button 
              type="button"
              onClick={handleItalic}
              className="p-2 rounded hover:bg-[#475569]"
              title="Italic"
            >
              <FaItalic className="text-[#94a3b8]" />
            </button>
            <button 
              type="button"
              onClick={handleUnderline}
              className="p-2 rounded hover:bg-[#475569]"
              title="Underline"
            >
              <FaUnderline className="text-[#94a3b8]" />
            </button>
          </div>
          
          {/* Headings and paragraph */}
          <div className="flex gap-1 mr-2 border-r border-[#334155] pr-2">
            <button 
              type="button"
              onClick={() => handleHeading(1)}
              className="p-2 rounded hover:bg-[#475569]"
              title="Heading 1"
            >
              <span className="text-[#94a3b8] font-bold">H1</span>
            </button>
            <button 
              type="button"
              onClick={() => handleHeading(2)}
              className="p-2 rounded hover:bg-[#475569]"
              title="Heading 2"
            >
              <span className="text-[#94a3b8] font-bold">H2</span>
            </button>
            <button 
              type="button"
              onClick={() => handleHeading(3)}
              className="p-2 rounded hover:bg-[#475569]"
              title="Heading 3"
            >
              <span className="text-[#94a3b8] font-bold">H3</span>
            </button>
            <button 
              type="button"
              onClick={handleParagraph}
              className="p-2 rounded hover:bg-[#475569]"
              title="Paragraph"
            >
              <FaParagraph className="text-[#94a3b8]" />
            </button>
          </div>
          
          {/* Lists */}
          <div className="flex gap-1 mr-2 border-r border-[#334155] pr-2">
            <button 
              type="button"
              onClick={handleBulletList}
              className="p-2 rounded hover:bg-[#475569]"
              title="Bullet List"
            >
              <FaListUl className="text-[#94a3b8]" />
            </button>
            <button 
              type="button"
              onClick={handleNumberedList}
              className="p-2 rounded hover:bg-[#475569]"
              title="Numbered List"
            >
              <FaListOl className="text-[#94a3b8]" />
            </button>
          </div>
          
          {/* Alignment */}
          <div className="flex gap-1 mr-2 border-r border-[#334155] pr-2">
            <button 
              type="button"
              onClick={handleAlignLeft}
              className="p-2 rounded hover:bg-[#475569]"
              title="Align Left"
            >
              <FaAlignLeft className="text-[#94a3b8]" />
            </button>
            <button 
              type="button"
              onClick={handleAlignCenter}
              className="p-2 rounded hover:bg-[#475569]"
              title="Align Center"
            >
              <FaAlignCenter className="text-[#94a3b8]" />
            </button>
            <button 
              type="button"
              onClick={handleAlignRight}
              className="p-2 rounded hover:bg-[#475569]"
              title="Align Right"
            >
              <FaAlignRight className="text-[#94a3b8]" />
            </button>
            <button 
              type="button"
              onClick={handleAlignJustify}
              className="p-2 rounded hover:bg-[#475569]"
              title="Justify"
            >
              <FaAlignJustify className="text-[#94a3b8]" />
            </button>
          </div>
          
          {/* Indentation */}
          <div className="flex gap-1 mr-2 border-r border-[#334155] pr-2">
            <button 
              type="button"
              onClick={handleIndent}
              className="p-2 rounded hover:bg-[#475569]"
              title="Indent"
            >
              <FaIndent className="text-[#94a3b8]" />
            </button>
            <button 
              type="button"
              onClick={handleOutdent}
              className="p-2 rounded hover:bg-[#475569]"
              title="Outdent"
            >
              <FaOutdent className="text-[#94a3b8]" />
            </button>
          </div>
          
          {/* Media and links */}
          <div className="flex gap-1">
            <button 
              type="button"
              onClick={handleLink}
              className="p-2 rounded hover:bg-[#475569]"
              title="Insert Link"
            >
              <FaLink className="text-[#94a3b8]" />
            </button>
            <button 
              type="button"
              onClick={handleImage}
              className="p-2 rounded hover:bg-[#475569]"
              title="Insert Image"
            >
              <FaImage className="text-[#94a3b8]" />
            </button>
            <button 
              type="button"
              onClick={handleTable}
              className="p-2 rounded hover:bg-[#475569]"
              title="Insert Table"
            >
              <FaTable className="text-[#94a3b8]" />
            </button>
          </div>
        </div>
        <div
          ref={editorRef}
          contentEditable
          className={`w-full bg-[#0f172a] text-white p-4 min-h-[200px] focus:outline-none editor-content ${!value && !isFocused ? 'editor-placeholder' : ''}`}
          onInput={handleContentChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          data-placeholder={placeholder}
        />
      </div>
      
      <Popup
        isOpen={popup.isOpen}
        message={popup.message}
        type={popup.type}
        onClose={closePopup}
      />
      
      <InputPopup
        isOpen={inputPopup.isOpen}
        title={inputPopup.title}
        type={inputPopup.type}
        placeholder={inputPopup.placeholder}
        initialValue={inputPopup.initialValue}
        onSubmit={inputPopup.onSubmit}
        onClose={() => setInputPopup({...inputPopup, isOpen: false})}
      />
    </>
  );
};

export default SimpleRichTextEditor;