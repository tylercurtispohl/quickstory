const exampleDoc = {
  type: "ComicDocument",
  content: [
    {
      type: "page",
      content: [
        {
          type: "pageheading",
          attrs: { level: 1 },
          content: [{ type: "text", text: "Page 1" }],
        },
        {
          type: "panel",
          content: [
            {
              type: "panelheading",
              attrs: { level: 2 },
              content: [{ type: "text", text: "Panel 1" }],
            },
            {
              type: "paneldescription",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Panel 1 description" }],
                },
                { type: "paragraph" },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const getDocBodyPlaceholder = () => JSON.stringify(exampleDoc);
