"use client";
/* hooks */
import React from "react";


type blogBlock = {
  mdElement: string | undefined;
  htmlElement: string;
  className: string;
  generateMarkdown?: (content: string, ...htmlOptions: string[]) => string;
  htmlOptions?: string[];
};
const blogElementsCat: {
  [key: string]:{ 
    [key:string]:blogBlock
  };
} = {
  newLineElements: {
    header: {
      mdElement: "# ",
      htmlElement: "h1",
      className: "text-[32px] font-[700] leading-[48px] uppercase mb-4",
      generateMarkdown: (content: string) => `# ${content}`,
    },
    subHeading: {
      mdElement: "## ",
      htmlElement: "h2",
      className: "bold text-[24px] font-[700] leading-[36px] uppercase mb-4",
      generateMarkdown: (content: string) => `## ${content}`,
    },
    paragraph: {
      mdElement: "",
      htmlElement: "p",
      className: "text-[18px] leading-[27px]",
      generateMarkdown: (content: string) => content,
    },
    "list item": {
      mdElement: "- ",
      htmlElement: "li",
      className: "flex flex-col gap-2",
      generateMarkdown: (content: string) => `- ${content}`,
    },
  
    divider: {
      mdElement: "---",
      htmlElement: "hr",
      className: "divider mb-4 mt-4",
      generateMarkdown: () => "---",
    },
  },
  insertElements:{
    image: {
      mdElement: "![Image](url)",
      htmlElement: "img",
      className:
        "w-full h-[400px] object-cover object-center rounded-[4px] mb-4 mx-auto",
      generateMarkdown: (url: string, alt: string) => `![${alt}](${url})`,
      htmlOptions: ["alt", "src"],
    },
    link: {
      mdElement: "[Link](url)",
      htmlElement: "a",
      className: "font-italic text-[#1E3A8A]",
      generateMarkdown: (text: string, url: string) => `[${text}](${url})`,
      htmlOptions: ["href"],
    },
    "code block": {
      mdElement: "```",
      htmlElement: "pre",
      className: "code-block",
      generateMarkdown: (content: string) => `\`\`\`\n${content}\n\`\`\``,
    },
    quote: {
      mdElement: "> ",
      htmlElement: "blockquote",
      className: "quote",
      generateMarkdown: (content: string) => `> ${content}`,
    },
    bold: {
      mdElement: "**",
      htmlElement: "b",
      className: "bold font-[700]",
      generateMarkdown: (content: string) => `**${content}**`,
    },
    italic: {
      mdElement: "*",
      htmlElement: "i",
      className: "font-italic",
      generateMarkdown: (content: string) => `*${content}*`,
    },
  },
};
const blogElements = {
  ...blogElementsCat.newLineElements,
  ...blogElementsCat.insertElements,
}
const generateHtml = (
  element: string,
  content: string,
  ...options: string[]
): string => {
  const { htmlElement, htmlOptions } = blogElements[element];
  const attributes = htmlOptions
    ? options
      .map((option, index) => `${htmlOptions[index]}="${option}"`)
      .join(" ")
    : "";

  return `<${htmlElement} ${attributes}>${content}</${htmlElement}>`;
};
const blogElementsRegex: {
  [key: string]: RegExp;
} = {
  // ... your existing blogElements object ...

  // Regex patterns for each Markdown element
  header: /^#/m,
  subHeading: /^##/m,
  paragraph: /^(?!#|##|-|\d+\.)\S/m,
  image: /^!\[.*?\]\(.*?\)/m,
  "ordered list": /^\d+\./m,
  "unordered list": /^-/m,
  "list item": /^(?!-|\d+\.)\S/m,
  quote: /^>/m,
  "code block": /^```/m,
  link: /^.*\)\[.*?\]\(.*?\)/m,
  divider: /^---/m,
  italic: /^_/m,
  bold: /^\*\*/m,
};

// Example usage:
const text =
  '# Heading 1\n\nThis is a **bold** paragraph.\n\n![Image](image.jpg)\n\n- List item 1\n- List item 2\n\n> Quote\n\n```javascript\nconsole.log("Code block");\n```\n\n[Link](https://example.com)\n\n---\n\n*Italic*\n';

const generateHtmlFromMarkdown = (text: string): React.ReactNode[] => {
  const lines: string[] = text.split("\n");
  console.log(lines);
  let resArray: React.ReactNode[] = [];
  let isInList = false;
  let listStack: React.ReactNode[] = [];

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    let matchedElement = "";

    for (const key in blogElements) {
      if (key == "list") return;
      if (!blogElements[key]) return;
      const { mdElement } = blogElements[key];
      if (mdElement == undefined) return;
      const regex = blogElementsRegex[key];

      if (regex.test(trimmedLine)) {
        matchedElement = key;
        const content = trimmedLine.slice(mdElement.length).trim();
        const options = line.match(/[^[\]]+(?=])/g) || [];

        if (key === "list item") {
          if (!isInList) {
            const ulElement = (
              <ul key={index} className={blogElements["list"].className}>
                {generateReactComponent(key, content, ...options)}
              </ul>
            );
            listStack.push(ulElement);
            isInList = true;
          } else {
            const liElement = generateReactComponent(key, content, ...options);
            const ulElement = listStack[
              listStack.length - 1
            ] as React.ReactElement;

            ulElement.props.children.push(liElement);
          }
        } else {
          if (isInList) {
            resArray.push(listStack.pop());
            isInList = listStack.length > 0;
          }
          resArray.push(generateReactComponent(key, content, ...options));
        }
      }
    }

    if (!matchedElement) {
      if (isInList && trimmedLine) {
        resArray.push(listStack.pop());
        isInList = listStack.length > 0;
      }
      // Check for sub-markdowns within the line
      const subMarkdowns = findSubMarkdowns(line);
      if (subMarkdowns.length > 0) {
        const lineElements = subMarkdowns.map((subMarkdown, subIndex) => (
          <React.Fragment key={`${index}-${subIndex}`}>
            {generateReactComponent(
              subMarkdown.type,
              subMarkdown.content,
              ...subMarkdown.options
            )}
          </React.Fragment>
        ));
        resArray.push(...lineElements);
      } else {
        resArray.push(line);
      }
    }

    if (index === lines.length - 1 && isInList) {
      while (listStack.length > 0) {
        resArray.push(listStack.pop());
      }
    }
  });

  return resArray;
};

// Function to find sub-markdowns within a line
const findSubMarkdowns = (
  line: string
): { type: string; content: string; options: string[] }[] => {
  const subMarkdowns: { type: string; content: string; options: string[] }[] =
    [];

  Object.keys(blogElements).forEach((key) => {
    if (key == "list") return;
    if (!blogElements[key]) return;
    const { mdElement } = blogElements[key];
    const regex = blogElementsRegex[key];
    if (mdElement == undefined) return;

    const matches = line.match(regex);
    if (matches) {
      matches.forEach((match) => {
        const content = match.slice(mdElement.length).trim();
        const options = match.match(/[^[\]]+(?=])/g) || [];
        subMarkdowns.push({ type: key, content, options });
      });
    }
  });

  return subMarkdowns;
};

const generateReactComponent = (
  key: string,
  content: string,
  ...options: string[]
) => {
  const { htmlElement, className } = blogElements[key];
  const htmlOptions = options
    .map((option) => option.split("="))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  const htmlAttributes = Object.entries(htmlOptions)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");
  if (["img", "hr"].includes(htmlElement))
    return React.createElement(htmlElement, { className, ...htmlOptions });

  return React.createElement(
    htmlElement,
    { className, ...htmlOptions },
    content
  );
};

// Example usage:
const markdownText = `
# Header
This is a **bold** paragraph.
![Image](https://randomuser.me/api/portraits/men/1.jpg)
- List item 1
- List item 2
> Quote
\`\`\`console.log("Code block");\`\`\`\n
[Link](https://example.com)\n
---
*Italic*\n
## Header 2
`;

export function MdToReactNode({ mdText }: { mdText: string }) {
  const htmlText = generateHtmlFromMarkdown(markdownText);

  return (
    <div className="h-[90vh] overflow-y-auto py-8">
      {htmlText.map((Item, index) => {
        return Item;
      })}
    </div>
  );
}

export {
  generateHtmlFromMarkdown,
  generateHtml,
  blogElements,
  blogElementsCat,
  blogElementsRegex,
};
