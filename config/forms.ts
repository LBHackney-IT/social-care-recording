import { Form } from "./forms.types"

const formData: Form[] = [
  {
    id: "assessment",
    name: "Social care assessment",
    steps: [
      {
        id: "foo",
        name: "Example section",
        theme: "About you",
        fields: [
          {
            id: "repeater-example",
            question: "Example repeater question",
            type: "repeater",
            hint: "Example hint",
            required: true,
          },
        ],
      },
      {
        id: "bar",
        name: "Example section 2",
        theme: "More stuff",
        fields: [
          {
            id: "example question",
            question: "What's your favourite colour?",
            type: "select",
            required: false,
            choices: [
              {
                value: "red",
                label: "Red",
              },
              {
                value: "green",
                label: "Green",
              },
            ],
          },
        ],
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
            type: "radios",
            className: "govuk-radios--inline",
            required: true,
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
            required: true,
            condition: {
              id: "prescribed-medications",
              value: "true",
            },
          },
          {
            id: "support-taking-or-using-medicatons",
            question: "Do you need support taking or using medication?",
            type: "text",
            required: true,
            prefill: "firstName",
          },
          {
            id: "pain-or-distress",
            question:
              "Does your physical condition or any medication that you are taking cause you pain or distress?",
            type: "radios",
            className: "govuk-radios--inline",
            required: true,
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
            type: "radios",
            className: "govuk-radios--inline",
            required: true,
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
            type: "radios",
            className: "govuk-radios--inline",
            required: true,
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
    name: "Case note",
    steps: [
      {
        id: "bar",
        name: "Bar",
        theme: "More stuff",
        fields: [
          {
            id: "example question",
            question: "What's your favourite colour?",
            type: "select",
            required: false,
            choices: [
              {
                value: "red",
                label: "Red",
              },
              {
                value: "green",
                label: "Green",
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "conversation-1",
    name: "Conversation 1",
    steps: [
      {
        id: "about-you",
        name: "About you",
        theme: "You and your home",
        fields: [
          {
            id: "first-name",
            question: "First name",
            type: "text",
            required: false,
            hint: "",
            error: "",
            choices: [],
          },
          {
            id: "last-name",
            question: "Last name",
            type: "text",
            required: false,
            hint: "",
            error: "",
            choices: [],
          },
          {
            id: "title",
            question: "Title",
            type: "text",
            required: false,
            hint: "",
            error: "",
            choices: [],
          },
          {
            id: "person-other-name",
            question: "Person other name",
            type: "text",
            required: false,
            hint: "",
            error: "",
            choices: [],
          },
          {
            id: "gender",
            question: "Gender",
            type: "text",
            required: false,
            hint: "",
            error: "",
            choices: [],
          },
          {
            id: "date-of-birth",
            question: "Date of birth",
            type: "text",
            required: false,
            hint: "",
            error: "",
            choices: [],
          },
          {
            id: "social-care-id-aka-person-id-mosaic-id",
            question: "Social care ID [aka Person ID / Mosaic ID]",
            type: "text",
            required: false,
            hint: "",
            error: "",
            choices: [],
          },
          {
            id: "nhs-number",
            question: "NHS number",
            type: "text",
            required: false,
            hint: "",
            error: "",
            choices: [],
          },
          {
            id: "address-line-1-2-3-4-postcode",
            question: "Address [line 1 / 2 / 3 / 4 / Postcode]",
            type: "text",
            required: false,
            hint: "",
            error: "",
            choices: [],
          },
          {
            id: "phone-number-can-be-multiple-with-type-options",
            question: "Phone number [can be multiple with type options]",
            type: "text",
            required: false,
            hint: "",
            error: "",
            choices: [],
          },
          {
            id: "person-type-asc-for-cfs",
            question: "Person type [ASC for CFS]",
            type: "text",
            required: false,
            hint: "",
            error: "",
            choices: [],
          },
        ],
      },
      {
        id: "about-your-home",
        name: "About your home",
        theme: "You and your home",
        fields: [
          {
            id: "primary-address-tenure-type",
            question: "Primary address tenure type",
            type: "select",
            required: false,
            hint: "",
            error: "",
            choices: [
              {
                value:
                  "acute-long-term-healthcare-residential-facility-or-hospital-(eg-nhs-independent-general-hospital-clinic",
                label:
                  "Acute / long-term healthcare residential facility or hospital (eg NHS independent general hospital / clinic",
              },
              { value: "long-stay-hospital", label: " long-stay hospital" },
              {
                value:
                  "approved-premises-for-offenders-released-from-prison-or-under-probation-supervision-(eg-probation-hostel)",
                label:
                  "\nApproved premises for offenders released from prison or under probation supervision (eg probation hostel)",
              },
              {
                value:
                  "mobile-accommodation-for-gypsy-roma-and-traveller-communities",
                label:
                  "\nMobile accommodation for Gypsy / Roma and Traveller communities",
              },
              {
                value:
                  "night-shelter-emergency-hostel-direct-access-hostel-(temporary-accommodation-accepting-self-referrals)",
                label:
                  "\nNight shelter / emergency hostel / direct access hostel (temporary accommodation accepting self-referrals)",
              },
              {
                value: "other-temporary-accommodation",
                label: "\nOther temporary accommodation",
              },
              {
                value: "owner-occupier-or-shared-ownership-scheme",
                label: "\nOwner occupier or shared ownership scheme",
              },
              {
                value:
                  "placed-in-temporary-accommodation-by-the-council-(including-homelessness-resettlement)",
                label:
                  "\nPlaced in temporary accommodation by the council (including homelessness resettlement)",
              },
              {
                value: "prison-young-offenders-institution-detention-centre",
                label:
                  "\nPrison / young offenders institution / detention centre",
              },
              { value: "refuge", label: "\nRefuge" },
              {
                value: "registered-care-home",
                label: "\nRegistered care home",
              },
              {
                value: "registered-nursing-home",
                label: "\nRegistered nursing home",
              },
              {
                value: "rough-sleeper-squatting",
                label: "\nRough sleeper  / squatting",
              },
              {
                value:
                  "settled-mainstream-housing-with-family-friends-(including-flat-sharing)",
                label:
                  "\nSettled mainstream housing with family / friends (including flat sharing)",
              },
              { value: "shared-lives-scheme", label: "\nShared lives scheme" },
              {
                value:
                  "sheltered-housing-extra-care-housing-other-sheltered-housing",
                label:
                  "\nSheltered housing / extra care housing / other sheltered housing",
              },
              {
                value: "staying-with-family-friends-as-a-short-term-guest",
                label: "\nStaying with family / friends as a short-term guest",
              },
              {
                value:
                  "supported-accommodation-supported-lodgings-supported-group-home-(ie-accommodation-supported-by-staff-or-resident-care",
                label:
                  "\nSupported accommodation / supported lodgings / supported group home (ie accommodation supported by staff or resident care",
              },
              {
                value: "tenant-(including-local-authority",
                label: "\nTenant (including local authority",
              },
              {
                value: "arms-length-management-organisations",
                label: " arms length management organisations",
              },
              {
                value: "registered-social-landlord",
                label: " registered social landlord",
              },
              { value: "housing-association)", label: " housing association)" },
              {
                value: "tenant-private-landlord",
                label: "\nTenant - private landlord",
              },
            ],
          },
          {
            id: "household-structure",
            question: "Household structure",
            type: "radios",
            required: false,
            hint: "",
            error: "",
            choices: [
              { value: "lives-alone", label: "Lives alone" },
              { value: "lives-with-others", label: " Lives with others" },
              { value: "unknown", label: " Unknown" },
            ],
          },
        ],
      },
      {
        id: "your-key-contacts",
        name: "Your key contacts",
        theme: "You and your home",
        fields: [
          {
            id: "name",
            question: "Name",
            type: "text",
            required: false,
            hint: "",
            error: "",
            choices: [],
          },
          {
            id: "relationship-role",
            question: "Relationship / role",
            type: "text",
            required: false,
            hint: "",
            error: "",
            choices: [],
          },
          {
            id: "address",
            question: "Address",
            type: "text",
            required: false,
            hint: "",
            error: "",
            choices: [],
          },
          {
            id: "phone-number-+-phone-type-+-add-additional-phone-number",
            question:
              "Phone number + Phone type\n[+ Add additional phone number]",
            type: "text",
            required: false,
            hint: "",
            error: "",
            choices: [],
          },
          {
            id: "email",
            question: "Email",
            type: "text",
            required: false,
            hint: "",
            error: "",
            choices: [],
          },
          {
            id: "option-to-'add-another-key-contact'",
            question: "[option to 'Add another key contact' ?]",
            type: "-",
            required: false,
            hint: "",
            error: "",
            choices: [],
          },
        ],
      },
      {
        id: "your-communication-needs",
        name: "Your communication needs",
        theme: "You and your home",
        fields: [
          {
            id: "fluency-in-english",
            question: "Fluency in English",
            type: "radios",
            required: false,
            hint: "",
            error: "",
            choices: [
              {
                value: "good-both-writtent-and-spoken",
                label: "Good both writtent and spoken",
              },
              { value: "not-fluent", label: " Not fluent" },
            ],
          },
          {
            id: "first-preferred-language",
            question: "First / preferred language",
            type: "text",
            required: false,
            hint: "",
            error: "",
            choices: [],
          },
          {
            id: "interpreter-required",
            question: "Interpreter required",
            type: "radios",
            required: false,
            hint: "",
            error: "",
            choices: [
              { value: "yes", label: "Yes" },
              { value: "no", label: " No" },
            ],
          },
          {
            id: "do-you-have-communication-difficulties",
            question: "Do you have communication difficulties?",
            type: "radios",
            required: false,
            hint: "",
            error: "",
            choices: [
              { value: "yes", label: "Yes" },
              { value: "no", label: " No" },
            ],
          },
          {
            id:
              "do-you-have-any-difficulties-with-understanding-andor-retaining-information",
            question:
              "Do you have any difficulties with understanding and/or retaining information?",
            type: "radios",
            required: false,
            hint: "",
            error: "",
            choices: [
              { value: "yes", label: "Yes" },
              { value: "no", label: " No" },
            ],
          },
          {
            id:
              "do-you-have-any-difficulties-making-decisions-andor-understanding-their-impact",
            question:
              "Do you have any difficulties making decisions and/or understanding their impact?",
            type: "radios",
            required: false,
            hint: "",
            error: "",
            choices: [
              { value: "yes", label: "Yes" },
              { value: "no", label: " No" },
            ],
          },
          {
            id: "further-details",
            question: "Further details",
            type: "textarea",
            required: false,
            hint: "",
            error: "",
            choices: [],
          },
        ],
      },
      {
        id: "about-your-needs",
        name: "About your needs",
        theme: "Your needs and assessment",
        fields: [
          {
            id:
              "your-interests-and-what-would-improve-your-wellbeing-or-quality-of-life.",
            question:
              "Your interests and what would improve your wellbeing or quality of life.",
            type: "textarea",
            required: false,
            hint:
              "Areas of my life I enjoy most or value (including my main interests and where I can most contribute) and changes that would improve my wellbeing or quality of life.",
            error: "",
            choices: [],
          },
        ],
      },
      {
        id: "worker's-assessment",
        name: "Worker's assessment",
        theme: "Your needs and assessment",
        fields: [
          {
            id: "worker's-recommendation",
            question: "Worker's recommendation",
            type: "textarea",
            required: false,
            hint: "What resources, support was recommended and outcome.",
            error: "",
            choices: [],
          },
          {
            id: "next-actions",
            question: "Next actions",
            type: "checkboxes",
            required: false,
            hint: "",
            error: "",
            choices: [
              {
                value: "community-care-assessment-occupational-therapy",
                label: "Community Care Assessment - Occupational Therapy",
              },
              { value: "no-further-action", label: " No further action" },
              { value: "case-closed", label: " Case closed" },
            ],
          },
          {
            id: "initial-contact-assessment",
            question: "Initial contact assessment",
            type: "radios",
            required: false,
            hint: "",
            error: "",
            choices: [
              {
                value: "long-term-community-support",
                label: "Long term community support",
              },
              {
                value: "short-term-community-support",
                label: " Short term community support",
              },
              { value: "universal-service", label: " Universal service" },
              { value: "no-support-provided", label: " No support provided" },
            ],
          },
        ],
      },
      {
        id: "carer-details",
        name: "Carer details",
        theme: "Your needs and assessment",
        fields: [
          {
            id: "do-you-receive-support-from-a-carer-(informal-unpaid)",
            question:
              "Do you receive support from a Carer? (informal / unpaid)",
            type: "radios",
            required: false,
            hint: "",
            error: "",
            choices: [
              { value: "yes", label: "Yes" },
              { value: "no", label: " No" },
            ],
          },
        ],
      },
      {
        id: "completed-by",
        name: "Completed by",
        theme: "Professionals involved",
        fields: [
          {
            id: "are-you-the-lead-conversation-officer",
            question: "Are you the lead conversation officer?",
            type: "select",
            required: false,
            hint:
              "Please use 'Find lead worker' below to select the 'Lead conversation officer'. If you are the lead officer then do this working as yourself (i.e. NOT whilst Acting for someone else).\nAlternatively you may Act for the lead officer then 'Find' them below and tick to sign on their behalf.",
            error: "",
            choices: [
              { value: "yes", label: "Yes" },
              {
                value: "no-acting-for-someone-else",
                label: " No - acting for someone else",
              },
            ],
          },
          {
            id: "other-professionals-involved",
            question: "Other professionals involved",
            type: "checkboxes",
            required: false,
            hint: "",
            error: "",
            choices: [
              { value: "gp", label: "GP" },
              { value: "modern-matron", label: " Modern matron" },
              { value: "district-nurse", label: " District nurse" },
              {
                value: "secondary-health-(hospital)",
                label: " Secondary health (hospital)",
              },
              {
                value: "secondary-health-(acrt)",
                label: " Secondary health (ACRT)",
              },
              { value: "occupational-therapy", label: " Occupational therapy" },
              { value: "social-worker", label: " Social worker" },
              { value: "sensory", label: " Sensory" },
              {
                value: "speech-and-language-therapist",
                label: " Speech and language therapist",
              },
              {
                value: "alcohol-and-drug-services",
                label: " Alcohol and drug services",
              },
              { value: "childrens-services", label: " Childrens services" },
              {
                value: "mental-health-services",
                label: " Mental health services",
              },
              { value: "lbh-housing-services", label: " LBH housing services" },
              {
                value: "non-lbh-housing-services",
                label: " Non-LBH housing services",
              },
              {
                value: "voluntary-and-community-sector",
                label: " Voluntary and community sector",
              },
              { value: "other", label: " Other" },
            ],
          },
        ],
      },
    ],
  },
]

export default formData
