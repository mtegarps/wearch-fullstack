"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  Youtube as YoutubeIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Minus,
  Code2,
} from "lucide-react";
import { useState, useCallback, useRef, useEffect } from "react";

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

// Pindahkan ke luar component
const ToolbarButton = ({
  onClick,
  isActive = false,
  children,
  title,
}: {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  title: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`p-2 rounded-lg transition-all ${
      isActive
        ? "bg-[#BBFF00] text-[#242222]"
        : "text-white/60 hover:text-white hover:bg-white/10"
    }`}
  >
    {children}
  </button>
);

export default function TipTapEditor({
  content,
  onChange,
  placeholder = "Start writing your article...",
}: TipTapEditorProps) {
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto my-4",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[#BBFF00] underline hover:text-[#d4ff4d]",
        },
      }),
      Youtube.configure({
        width: 640,
        height: 360,
        HTMLAttributes: {
          class: "rounded-lg my-4 mx-auto",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-lg max-w-none min-h-[400px] focus:outline-none px-4 py-3",
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const addImage = useCallback(() => {
    if (imageUrl && editor) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setShowImageInput(false);
    }
  }, [editor, imageUrl]);

  const addLink = useCallback(() => {
    if (linkUrl && editor) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
      setLinkUrl("");
      setShowLinkInput(false);
    }
  }, [editor, linkUrl]);

  const addYoutube = useCallback(() => {
    if (youtubeUrl && editor) {
      editor.commands.setYoutubeVideo({ src: youtubeUrl });
      setYoutubeUrl("");
      setShowYoutubeInput(false);
    }
  }, [editor, youtubeUrl]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "articles");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        editor.chain().focus().setImage({ src: data.url }).run();
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // Loading state
  if (!isMounted) {
    return (
      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
        <div className="bg-[#242222] border-b border-white/10 p-2 h-12" />
        <div className="min-h-[400px] px-4 py-3 text-white/30">Loading editor...</div>
      </div>
    );
  }

  if (!editor) {
    return (
      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
        <div className="bg-[#242222] border-b border-white/10 p-2 h-12" />
        <div className="min-h-[400px] px-4 py-3 text-white/30">Initializing...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="bg-[#242222] border-b border-white/10 p-2 flex flex-wrap gap-1">
        {/* Text Formatting */}
        <div className="flex items-center gap-1 pr-2 border-r border-white/10">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            title="Bold"
          >
            <Bold size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            title="Italic"
          >
            <Italic size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
            title="Underline"
          >
            <UnderlineIcon size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive("strike")}
            title="Strikethrough"
          >
            <Strikethrough size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive("code")}
            title="Inline Code"
          >
            <Code size={18} />
          </ToolbarButton>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 pr-2 border-r border-white/10">
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            isActive={editor.isActive("heading", { level: 1 })}
            title="Heading 1"
          >
            <Heading1 size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            isActive={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            <Heading2 size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            isActive={editor.isActive("heading", { level: 3 })}
            title="Heading 3"
          >
            <Heading3 size={18} />
          </ToolbarButton>
        </div>

        {/* Lists & Quote */}
        <div className="flex items-center gap-1 pr-2 border-r border-white/10">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <List size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            title="Numbered List"
          >
            <ListOrdered size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
            title="Quote"
          >
            <Quote size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive("codeBlock")}
            title="Code Block"
          >
            <Code2 size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal Rule"
          >
            <Minus size={18} />
          </ToolbarButton>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-1 pr-2 border-r border-white/10">
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            isActive={editor.isActive({ textAlign: "left" })}
            title="Align Left"
          >
            <AlignLeft size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            isActive={editor.isActive({ textAlign: "center" })}
            title="Align Center"
          >
            <AlignCenter size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            isActive={editor.isActive({ textAlign: "right" })}
            title="Align Right"
          >
            <AlignRight size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            isActive={editor.isActive({ textAlign: "justify" })}
            title="Justify"
          >
            <AlignJustify size={18} />
          </ToolbarButton>
        </div>

        {/* Media & Links */}
        <div className="flex items-center gap-1 pr-2 border-r border-white/10">
          <ToolbarButton
            onClick={() => setShowLinkInput(!showLinkInput)}
            isActive={editor.isActive("link")}
            title="Add Link"
          >
            <LinkIcon size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => fileInputRef.current?.click()}
            title="Upload Image"
          >
            <ImageIcon size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => setShowImageInput(!showImageInput)}
            title="Image from URL"
          >
            <ImageIcon size={18} className="opacity-60" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => setShowYoutubeInput(!showYoutubeInput)}
            title="YouTube Video"
          >
            <YoutubeIcon size={18} />
          </ToolbarButton>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        {/* Undo/Redo */}
        <div className="flex items-center gap-1">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            title="Undo"
          >
            <Undo size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            title="Redo"
          >
            <Redo size={18} />
          </ToolbarButton>
        </div>
      </div>

      {/* Link Input */}
      {showLinkInput ? (
        <div className="bg-[#242222] border-b border-white/10 p-3 flex gap-2">
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Enter URL..."
            className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#BBFF00]/50"
            onKeyDown={(e) => e.key === "Enter" && addLink()}
          />
          <button
            onClick={addLink}
            className="px-4 py-2 bg-[#BBFF00] text-[#242222] rounded-lg text-sm font-medium"
          >
            Add Link
          </button>
          <button
            onClick={() => {
              editor.chain().focus().unsetLink().run();
              setShowLinkInput(false);
            }}
            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium"
          >
            Remove
          </button>
        </div>
      ) : null}

      {/* Image URL Input */}
      {showImageInput ? (
        <div className="bg-[#242222] border-b border-white/10 p-3 flex gap-2">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL..."
            className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#BBFF00]/50"
            onKeyDown={(e) => e.key === "Enter" && addImage()}
          />
          <button
            onClick={addImage}
            className="px-4 py-2 bg-[#BBFF00] text-[#242222] rounded-lg text-sm font-medium"
          >
            Add Image
          </button>
        </div>
      ) : null}

      {/* YouTube Input */}
      {showYoutubeInput ? (
        <div className="bg-[#242222] border-b border-white/10 p-3 flex gap-2">
          <input
            type="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="Enter YouTube URL..."
            className="flex-1 bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#BBFF00]/50"
            onKeyDown={(e) => e.key === "Enter" && addYoutube()}
          />
          <button
            onClick={addYoutube}
            className="px-4 py-2 bg-[#BBFF00] text-[#242222] rounded-lg text-sm font-medium"
          >
            Add Video
          </button>
        </div>
      ) : null}

      {/* Editor Content */}
      <EditorContent editor={editor} />

      {/* Bubble Menu - render terpisah dengan portal */}
      {editor && editor.isEditable && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ 
            duration: 100,
            appendTo: () => document.body,
          }}
          className="bg-[#242222] border border-white/10 rounded-lg shadow-xl flex overflow-hidden"
        >
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 ${
              editor.isActive("bold") ? "bg-[#BBFF00] text-[#242222]" : "text-white"
            }`}
          >
            <Bold size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 ${
              editor.isActive("italic") ? "bg-[#BBFF00] text-[#242222]" : "text-white"
            }`}
          >
            <Italic size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 ${
              editor.isActive("underline") ? "bg-[#BBFF00] text-[#242222]" : "text-white"
            }`}
          >
            <UnderlineIcon size={16} />
          </button>
        </BubbleMenu>
      )}

      {/* Editor Styles */}
      <style jsx global>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          color: rgba(255, 255, 255, 0.3);
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }

        .ProseMirror {
          color: white;
        }

        .ProseMirror h1 {
          font-size: 2.25rem;
          font-weight: 700;
          margin: 1.5rem 0 1rem;
          color: white;
        }

        .ProseMirror h2 {
          font-size: 1.75rem;
          font-weight: 600;
          margin: 1.25rem 0 0.75rem;
          color: white;
        }

        .ProseMirror h3 {
          font-size: 1.375rem;
          font-weight: 600;
          margin: 1rem 0 0.5rem;
          color: white;
        }

        .ProseMirror p {
          margin: 0.75rem 0;
          line-height: 1.75;
        }

        .ProseMirror blockquote {
          border-left: 4px solid #BBFF00;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: rgba(255, 255, 255, 0.8);
        }

        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5rem;
          margin: 1rem 0;
        }

        .ProseMirror li {
          margin: 0.5rem 0;
        }

        .ProseMirror code {
          background: rgba(187, 255, 0, 0.1);
          color: #BBFF00;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-family: monospace;
        }

        .ProseMirror pre {
          background: #0d0d0d;
          border-radius: 0.5rem;
          padding: 1rem;
          margin: 1rem 0;
          overflow-x: auto;
        }

        .ProseMirror pre code {
          background: transparent;
          padding: 0;
          color: #BBFF00;
        }

        .ProseMirror hr {
          border: none;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin: 2rem 0;
        }

        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
        }

        .ProseMirror a {
          color: #BBFF00;
          text-decoration: underline;
        }

        .ProseMirror iframe {
          width: 100%;
          max-width: 640px;
          aspect-ratio: 16/9;
          border-radius: 0.5rem;
          margin: 1rem auto;
          display: block;
        }
      `}</style>
    </div>
  );
}