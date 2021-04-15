import { Form } from "./forms.types"

const formData: Form[] = [
  {
    id: "assessment",
    name: "Social care assessment",
    steps: [
      {
        id: "foo",
        name: "Foo",
        theme: "About you",
        fields: [],
      },
      {
        id: "bar",
        name: "Bar",
        theme: "More stuff",
        fields: [],
      },
      {
        id: "your-medication-and-symptoms",
        name: "Your medication and symptoms",
        theme: "About you",
        fields: [
          {
            id: "prescribed-medications",
            question: "Are you taking any prescribed medications?",
            hint: "For example, XYZ",
            type: "radio",
            choices: [
              {
                value: "true",
                label: "Yes",
              },
              {
                value: "false",
                label: "No",
              },
            ],
          },
          {
            id: "medications",
            question: "Which medications?",
            error: "This is a custom error message",
            type: "textarea",
            condition: {
              id: "prescribed-medications",
              value: "true",
            },
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
                value: "true",
                label: "Yes",
              },
              {
                value: "false",
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
                value: "true",
                label: "Yes",
              },
              {
                value: "false",
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
                value: "true",
                label: "Yes",
              },
              {
                value: "false",
                label: "No",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "example",
    name: "Example process",
    steps: [],
  },
]

export default formData
