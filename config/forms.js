export default [
  {
    id: "example",
    name: "Example process",
  },
  {
    id: "assessment",
    name: "Social care assessment",
    steps: [
      {
        id: "about-you",
        name: "Your medication and symptoms",
        fields: [
          {
            id: "prescribed-medicatons",
            question: "Are you taking any prescribed medications?",
            type: "radio",
            choices: [
              {
                value: true,
                label: "Yes",
              },
              {
                value: false,
                label: "No",
              },
            ],
          },
          {
            id: "medications",
            question: "Which medications?",
            type: "textarea",
          },
          {
            id: "support-taking-or-using-medicatons",
            question: "Do you need support taking or using medication?",
            type: "textarea",
          },
          {
            id: "pain-or-distress",
            question:
              "Does your physical condition or any medication that you are taking cause you pain or distress?",
            type: "radio",
            choices: [
              {
                value: true,
                label: "Yes",
              },
              {
                value: false,
                label: "No",
              },
            ],
          },
          {
            id: "adequate-pain-relief",
            question:
              "Are you getting adequate relief from pain or other distressing physical symptoms?",
            type: "radio",
            choices: [
              {
                value: true,
                label: "Yes",
              },
              {
                value: false,
                label: "No",
              },
            ],
          },
          {
            id: "difficulty-breathing",
            question: "Do you have difficulty breathing?",
            type: "radio",
            choices: [
              {
                value: true,
                label: "Yes",
              },
              {
                value: false,
                label: "No",
              },
            ],
          },
        ],
      },
    ],
  },
]
