export const MenuData = {
  items: [
    { id: "Home", text: "Home", icon: "fas fa-home", link: "/", path: "Home", items: [] },
    {
      id: "General Ledger",
      text: "General Ledger",
      icon: "fas fa-layer-group",
      link: "/Menu/General Ledger",
      path: "General Ledger",
      items: []
    },
    {
      id: "Accounts Payable",
      text: "Accounts Payable",
      icon: "fas fa-money-bill-alt",
      link: "/Menu/Accounts Payable",
      path: "Accounts Payable",
      items: []
    },
    {
      id: "Accounts Receivable",
      text: "Accounts Receivable",
      icon: "fas fa-cart-arrow-down",
      link: "/Menu/Accounts Receivable",
      path: "Accounts Receivable",
      items: []
    },
    {
      id: "Inventory",
      text: "Inventory",
      icon: "fas fa-archive",
      link: "/Menu/Inventory",
      path: "Inventory",
      items: []
    },
    {
      id: "Reports",
      text: "Reports",
      icon: "fas fa-file-invoice-dollar",
      link: "/Menu/Reports",
      path: "Reports",
      items: []
    },
    {
      id: "Administration",
      text: "Administration",
      icon: "fas fa-cogs",
      link: "/Menu/Administration",
      path: "Administration",
      items: [
        {
          id: "Users",
          text: "Users",
          description: "Manage users and assign security roles in the organization.",
          icon: "fas fa-users",
          link: "/Users",
          path: "Administration/Users",
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
      ]
    }
  ]
};
