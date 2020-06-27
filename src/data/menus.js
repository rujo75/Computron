export const MenuData = {
  items: [
    { id: "Home", text: "Home", icon: "fas fa-home", link: "/", path: "Home", items: [] },
    {
      id: "General Ledger",
      text: "General Ledger",
      icon: "fas fa-layer-group",
      link: "/Page/General Ledger",
      path: "General Ledger",
      items: []
    },
    {
      id: "Accounts Payable",
      text: "Accounts Payable",
      icon: "fas fa-money-bill-alt",
      link: "/Page/Accounts Payable",
      path: "Accounts Payable",
      items: []
    },
    {
      id: "Accounts Receivable",
      text: "Accounts Receivable",
      icon: "fas fa-cart-arrow-down",
      link: "/Page/Accounts Receivable",
      path: "Accounts Receivable",
      items: []
    },
    {
      id: "Inventory",
      text: "Inventory",
      icon: "fas fa-archive",
      link: "/Page/Inventory",
      path: "Inventory",
      items: []
    },
    {
      id: "Reports",
      text: "Reports",
      icon: "fas fa-file-invoice-dollar",
      link: "/Page/Reports",
      path: "Reports",
      items: []
    },
    {
      id: "Lists",
      text: "Lists",
      icon: "fas fa-list",
      link: "/Page/Lists",
      path: "Lists",
      items: [
        {
          id: "BankAccounts",
          text: "Bank Accounts",
          description: "Create and manage your bank accounts.",
          icon: "fas fa-university",
          link: "/BankAccounts",
          path: "Lists/BankAccounts",
          favourite: false,
          items: []
        },
      ]
    },
    {
      id: "Administration",
      text: "Administration",
      icon: "fas fa-cogs",
      link: "/Page/Administration",
      path: "Administration",
      items: [
        {
          id: "Companies",
          text: "Companies",
          description: "Create and manage your companies.",
          icon: "fas fa-building",
          link: "/Companies",
          path: "Administration/Companies",
          favourite: false,
          items: []
        },
        {
          id: "Settings",
          text: "Settings",
          description: "Customise and configure the application settings.",
          icon: "fas fa-cog",
          link: "/Settings",
          path: "Administration/Settings",
          favourite: false,
          items: []
        },
        {
          id: "Users",
          text: "Users",
          description: "Manage users and assign security roles.",
          icon: "fas fa-users",
          link: "/Users",
          path: "Administration/Users",
          favourite: false,
          items: []
        },
      ]
    }
  ]
};
