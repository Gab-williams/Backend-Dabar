export const menu = [
  {
    heading: "Use-Case Preview",
  },
  {
    icon: "bag",
    text: "AI Copywriter",
    link: "/copywriter",
    badge: "hot",
    newTab: true,
  },
  { heading: "Dashboard" },
  {
    icon: "presentation",
    text: "Default Dashboard",
    link: "/",
  },
  {
    icon: "cc-alt2",
    text: "Sales Dashboard",
    link: "/sales",
  },
  {
    icon: "coins",
    text: "Invest Dashboard",
    link: "/invest",
  },
  {
    icon: "bitcoin-cash",
    text: "Crypto Dashboard",
    link: "/crypto",
  },
  {
    icon: "growth",
    text: "Analytics Dashboard",
    link: "/analytics",
  },
  {
    heading: "Pre-built Pages",
  },
  {
    icon: "tile-thumb",
    text: "Projects",
    active: false,
    subMenu: [
      {
        text: "Project Cards",
        link: "/project-card",
      },
      {
        text: "Project List",
        link: "/project-list",
      },
    ],
  },
  {
    icon: "users",
    text: "User Manage",
    active: true,
    subMenu: [
      {
        text: "User List - Regular",
        link: "/user-list-regular",
      },
      {
        text: "User List - Compact",
        link: "/user-list-compact",
      },
      {
        text: "User Details - Regular",
        link: "/user-details-regular/1",
      },
      {
        text: "User Profile - Regular",
        link: "/user-profile-regular",
      },
      {
        text: "User Contact - Card",
        link: "/user-contact-card",
      },
    ],
  },
  {
    icon: "file-docs",
    text: "AML / KYCs",
    active: false,
    subMenu: [
      {
        text: "KYC List - Regular",
        link: "/kyc-list-regular",
      },
      {
        text: "KYC Details - Regular",
        link: "/kyc-details-regular/UD01544",
      },
    ],
  },
  {
    icon: "tranx",
    text: "Transaction",
    active: false,
    subMenu: [
      {
        text: "Trans List - Basic",
        link: "/transaction-basic",
      },
      {
        text: "Trans List - Crypto",
        link: "/transaction-crypto",
      },
    ],
  },
  {
    icon: "grid-alt",
    text: "Applications",
    active: false,
    subMenu: [
      {
        text: "Messages",
        link: "/app-messages",
      },
      {
        text: "Chats / Messenger",
        link: "/app-chat",
      },
      {
        text: "Mailbox",
        link: "/app-inbox",
      },
      {
        text: "Calendar",
        link: "/app-calender",
      },
      {
        text: "Kanban",
        link: "/app-kanban",
      },
      {
        text: "File Manager",
        link: "/app-file-manager",
        badge: "new",
      },
    ],
  },
  {
    icon: "card-view",
    text: "Products",
    active: false,
    subMenu: [
      {
        text: "Product List",
        link: "/product-list",
      },
      {
        text: "Product Card",
        link: "/product-card",
      },
      {
        text: "Product Details",
        link: "/product-details/0",
      },
    ],
  },
  {
    icon: "file-docs",
    text: "Invoice",
    active: false,
    subMenu: [
      {
        text: "Invoice List",
        link: "/invoice-list",
      },
      {
        text: "Invoice Details",
        link: "/invoice-details/1",
      },
    ],
  },
  {
    icon: "view-col",
    text: "Pricing Table",
    link: "/pricing-table",
  },
  {
    icon: "img",
    text: "Image Gallery",
    link: "/image-gallery",
  },
  {
    heading: "Misc Pages",
  },
  {
    icon: "signin",
    text: "Auth Pages",
    active: false,
    subMenu: [
      {
        text: "Login / Signin",
        link: "/auth-login",
        newTab: true,
      },
      {
        text: "Register / Signup",
        link: "/auth-register",
        newTab: true,
      },
      {
        text: "Forgot Password",
        link: "/auth-reset",
        newTab: true,
      },
      {
        text: "Success / Confirm",
        link: "/auth-success",
        newTab: true,
      },
    ],
  },
  {
    icon: "files",
    text: "Error Pages",
    active: false,
    subMenu: [
      {
        text: "404 Classic",
        link: "/errors/404-classic",
        newTab: true,
      },
      {
        text: "504 Classic",
        link: "/errors/504-classic",
        newTab: true,
      },
      {
        text: "404 Modern",
        link: "/errors/404-modern",
        newTab: true,
      },
      {
        text: "504 Modern",
        link: "/errors/504-modern",
        newTab: true,
      },
    ],
  },
  {
    icon: "files",
    text: "Other Pages",
    active: false,
    subMenu: [
      {
        text: "Blank / Startup",
        link: "/_blank",
      },
      {
        text: "Faqs / Help",
        link: "/pages/faq",
      },
      {
        text: "Terms / Policy",
        link: "/pages/terms-policy",
      },
      {
        text: "Regular Page - v1",
        link: "/pages/regular-v1",
      },
      {
        text: "Regular Page - v2",
        link: "/pages/regular-v2",
      },
    ],
  },
  {
    heading: "Components",
  },
  {
    icon: "layers",
    text: "Ui Elements",
    active: false,
    subMenu: [
      {
        text: "Alerts",
        link: "/components/alerts",
      },
      {
        text: "Accordions",
        link: "/components/accordions",
      },
      {
        text: "Avatar",
        link: "/components/avatar",
      },
      {
        text: "Badges",
        link: "/components/badges",
      },
      {
        text: "Buttons",
        link: "/components/buttons",
      },
      {
        text: "Button Group",
        link: "/components/button-group",
      },
      {
        text: "Breadcrumbs",
        link: "/components/breadcrumbs",
      },
      {
        text: "Cards",
        link: "/components/cards",
      },
      {
        text: "Carousel",
        link: "/components/carousel",
      },
      {
        text: "Dropdowns",
        link: "/components/dropdowns",
      },
      {
        text: "Modals",
        link: "/components/modals",
      },
      {
        text: "Pagination",
        link: "/components/pagination",
      },
      {
        text: "Popovers",
        link: "/components/popovers",
      },
      {
        text: "Progress",
        link: "/components/progress",
      },
      {
        text: "Spinner",
        link: "/components/spinner",
      },
      {
        text: "Tabs",
        link: "/components/tabs",
      },
      {
        text: "Toast",
        link: "/components/toast",
      },
      {
        text: "Typography",
        link: "/components/typography",
      },
      {
        text: "Tooltips",
        link: "/components/tooltips",
      },
      {
        text: "Utilities",
        active: false,
        subMenu: [
          {
            text: "Borders",
            link: "/components/util-border",
          },
          {
            text: "Colors",
            link: "/components/util-colors",
          },
          {
            text: "Display",
            link: "/components/util-display",
          },
          {
            text: "Embeded",
            link: "/components/util-embeded",
          },
          {
            text: "Flex",
            link: "/components/util-flex",
          },
          {
            text: "Text",
            link: "/components/util-text",
          },
          {
            text: "Sizing",
            link: "/components/util-sizing",
          },
          {
            text: "Spacing",
            link: "/components/util-spacing",
          },
          {
            text: "Others",
            link: "/components/util-others",
          },
        ],
      },
    ],
  },
  {
    icon: "dot-box",
    text: "Crafted Icons",
    active: false,
    subMenu: [
      {
        text: "SVG Icon-Exclusive",
        link: "/svg-icons",
      },
      {
        text: "Nioicon - HandCrafted",
        link: "/nioicon",
      },
    ],
  },
  {
    icon: "table-view",
    text: "Tables",
    active: false,
    subMenu: [
      {
        text: "Basic Tables",
        link: "/table-basic",
      },
      {
        text: "Special Tables",
        link: "/table-special",
      },
      {
        text: "DataTables",
        link: "/table-datatable",
      },
    ],
  },
  {
    icon: "card-view",
    text: "Forms",
    active: false,
    subMenu: [
      {
        text: "Form Elements",
        link: "/components/form-elements",
      },
      {
        text: "Checkbox Radio",
        link: "/components/checkbox-radio",
      },
      {
        text: "Advanced Controls",
        link: "/components/advanced-control",
      },
      {
        text: "Input Group",
        link: "/components/input-group",
      },
      {
        text: "Form Upload",
        link: "/components/form-upload",
      },
      {
        text: "Date Time Picker",
        link: "/components/datetime-picker",
      },
      {
        text: "Number Spinner",
        link: "/components/number-spinner",
      },
      {
        text: "noUiSlider",
        link: "/components/nouislider",
      },
      {
        text: "Form Layouts",
        link: "/components/form-layouts",
      },
      {
        text: "Form Validation",
        link: "/components/form-validation",
      },
      {
        text: "Wizard Basic",
        link: "/components/wizard-basic",
      },
      {
        text: "Rich Editor",
        active: false,
        subMenu: [
          {
            text: "Quill",
            link: "/components/quill",
          },
          {
            text: "Tinymce",
            link: "/components/tinymce",
          },
        ],
      },
    ],
  },
  {
    icon: "pie",
    text: "Charts",
    active: false,
    subMenu: [
      {
        text: "Chart Js",
        link: "/charts/chartjs",
      },
      {
        text: "Knobs",
        link: "/charts/knobs",
      },
    ],
  },
  {
    icon: "puzzle",
    text: "Widgets",
    subMenu: [
      {
        text: "Card Widgets",
        link: "/components/widgets/cards",
      },
      {
        text: "Chart Widgets",
        link: "/components/widgets/charts",
      },
      {
        text: "Rating Widgets",
        link: "/components/widgets/rating",
      },
    ],
  },
  {
    icon: "block-over",
    text: "Miscellaneous",
    subMenu: [
      {
        text: "Slick Sliders",
        link: "/components/misc/slick-slider",
      },
      {
        text: "JsTree",
        link: "/components/misc/jsTree",
      },
      {
        text: "React Toastify",
        link: "/components/misc/toastify",
      },
      {
        text: "Sweet Alert",
        link: "/components/misc/sweet-alert",
      },
      {
        text: "React DualListBox",
        link: "/components/misc/dual-list",
      },
      {
        text: "React Beautiful Dnd",
        link: "/components/misc/beautiful-dnd",
      },
      {
        text: "Google Map",
        link: "/components/misc/map",
      },
    ],
  },
  {
    icon: "text-rich",
    text: "Email Template",
    link: "/email-template",
    active: "false",
  },
];
export const headermenu = [
  {
    text: "Dashboards",
    link:"#",
    active: false,
    subMenu: [
      {
        text: "Default Dashboard",
        link: "/",
      },
      {
        text: "Sales Dashboard",
        link: "/sales",
      },
      {
        text: "Invest Dashboard",
        link: "/invest",
      },
      {
        text: "Crypto Dashboard",
        link: "/crypto",
      },
      {
        text: "Analytics Dashboard",
        link: "/analytics",
      },
    ],
  },
  {
    text: "Apps",
    link:"#",
    active: false,
    subMenu: [
      {
        text: "Messages",
        link: "/app-messages",
      },
      {
        text: "Inbox / Mail",
        link: "/app-inbox",
      },
      {
        text: "File Manager",
        link: "/app-file-manager",
      },
      {
        text: "Chats / Messenger",
        link: "/app-chat",
      },
      {
        text: "Calendar",
        link: "/app-calender",
      },
      {
        text: "Kanban Board",
        link: "/app-kanban",
      },
    ],
  },
  {
    text: "Components",
    link: "/components",
  },
];

export const copywritermenu = [
  {
    heading: "Dashboards",
  },
  {
    text: "Dashboard",
    icon: "presentation",
    link: "/demo9/copywriter",
  },
  {
    text: "Documents",
    icon: "folder-list",
    subMenu: [
      {
        text: "Pushlished",
        link: "/demo9/copywriter/document-saved",
      },
      {
        text: "Drafts",
        link: "/demo9/copywriter/document-drafts",
      },
      {
        text: "Categories",
        link: "/demo9/copywriter/document-categories",
      },
    ],
  },
  {
    text: "Editor",
    icon: "edit",
    link: "/demo9/copywriter/document-editor",
  },
  {
    icon: "users",
    text: "User Manage",
    active: true,
    subMenu: [
      {
        text: "User List",
        link: "/demo9/user-list-regular",
      },
      {
        text: "Email List",
        link: "/demo9/user-list-compact",
      },
      // {
      //   text: "User Details - Regular",
      //   link: "/demo9/user-details-regular/1",
      // },
      // {
      //   text: "User Profile - Regular",
      //   link: "/demo9/user-profile-regular",
      // },
      // {
      //   text: "User Contact - Card",
      //   link: "/demo9/user-contact-card",
      // },
    ],
  },
  // {
  //   text: "History",
  //   icon: "clock",
  //   link: "demo9/copywriter/history",
  // },
  // {
  //   text: "Pricing Plans",
  //   icon: "sign-usdc",
  //   link: "/copywriter/pricing-plans",
  // },
  {
    text: "Profile",
    icon: "user",
    link: "/copywriter/profile",
  },
  {
    text: "Media",
    icon: "music",
    link: "/demo9/image-gallery",
  },
  // {
  //   text: "Payments",
  //   icon: "wallet",
  //   newTab: true,
  //   link: "/copywriter/payment",
  // },
  // {
  //   heading: "Return To",
  // },
  // {
  //   text: "Main Dashboard",
  //   icon: "dashlite-alt",
  //   link: "/",
  // },
  // {
  //   text: "All Components",
  //   icon: "layers-fill",
  //   link: "/components",
  // },
];

export const copywriterheadermenu = [
  {
    text: "Documents",
    subMenu: [
      {
        text: "Saved",
        link: "/demo9/copywriter/document-saved",
      },
      {
        text: "Drafts",
        link: "/demo9/copywriter/document-drafts",
      },
    ],
  },
  {
    text: "Editor",
    link: "/copywriter/document-editor",
  },
  {
    text: "Templates",
    link: "/copywriter/templates",
  },
];

export default menu;
