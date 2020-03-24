export const MenuData = {
  items: [
    { id: "1", text: "Home", icon: "fas fa-home", link: "/", items: [] },
    {
      id: "2",
      text: "General Ledger",
      icon: "fas fa-layer-group",
      link: "/Menu/2",
      items: [
        {
          id: "2.1",
          text: "System Parameters",
          icon: "fas fa-folder-open",
          link: "/Menu/2.1",
          favourite: false,
          items: [
            {
              id: "2.1.1",
              text: "Company Maintenance",
              icon: "fas fa-cog",
              link: "/CompanyMaintenance",
              favourite: false, items: []
            },
            {
              id: "2.1.2",
              text: "Company Inquiry/List",
              icon: "fas fa-file-alt",
              link: "/Menu/2.1.2",
              favourite: false, items: []
            },
            {
              id: "2.1.3",
              text: "Company Parameters Maintenance",
              icon: "fas fa-cog",
              link: "/Menu/2.1.3",
              favourite: false, items: []
            },
            {
              id: "2.1.4",
              text: "Parameters Inquiry/List",
              icon: "fas fa-file-alt",
              link: "/Menu/2.1.4",
              favourite: false, items: []
            },
            {
              id: "2.1.5",
              text: "End of Period/End of Year",
              icon: "fas fa-cog",
              link: "/Menu/2.1.5",
              favourite: false, items: []
            },
            {
              id: "2.1.6",
              text: "Calendar Maintenance Menu",
              icon: "fas fa-folder-open",
              link: "/Menu/2.1.6",
              favourite: false, items: []
            },
            {
              id: "2.1.7",
              text: "Currency Maintenance Menu",
              icon: "fas fa-folder-open",
              link: "/Menu/2.1.7",
              favourite: false, items: []
            },
            {
              id: "2.1.8",
              text: "Data Class Maintenance",
              icon: "fas fa-cog",
              link: "/Menu/2.1.8",
              favourite: false, items: []
            },
            {
              id: "2.1.9",
              text: "Data Class Inquiry/List",
              icon: "fas fa-file-alt",
              link: "/Menu/2.1.9",
              favourite: false, items: []
            },
            {
              id: "2.1.10",
              text: "Auto Balance PAI Maintenance",
              icon: "fas fa-folder-open",
              link: "/Menu/2.1.10",
              favourite: false, items: []
            }
          ]
        },
        {
          id: "2.2",
          text: "Posting Account Structure",
          icon: "fas fa-folder-open",
          link: "/Menu/2.2",
          favourite: false,
          items: []
        },
        {
          id: "2.3",
          text: "Posting Account Maintenance",
          icon: "fas fa-folder-open",
          link: "/Menu/2.3",
          favourite: false, items: []
        },
        {
          id: "2.4",
          text: "Transaction Parameters",
          icon: "fas fa-folder-open",
          link: "/Menu/2.4",
          favourite: false, items: []
        },
        {
          id: "2.5",
          text: "Transaction Processing",
          icon: "fas fa-folder-open",
          link: "/Menu/2.5",
          favourite: false, items: []
        },
        {
          id: "2.6",
          text: "Memos and Budgets",
          icon: "fas fa-folder-open",
          link: "/Menu/2.6",
          favourite: false, items: []
        },
        {
          id: "2.7",
          text: "Generated Transactions",
          icon: "fas fa-folder-open",
          link: "/Menu/2.7",
          favourite: false, items: []
        },
        {
          id: "2.8",
          text: "EDE - Enhanced Data Entry",
          icon: "fas fa-folder-open",
          link: "/Menu/2.8",
          favourite: false, items: []
        },
        {
          id: "2.9",
          text: "Power Report Writer",
          icon: "fas fa-folder-open",
          link: "/Menu/2.9",
          favourite: false, items: []
        },
        {
          id: "2.10",
          text: "Trial Balance & Ledger Reports",
          icon: "fas fa-folder-open",
          link: "/Menu/2.10",
          favourite: false, items: []
        },
        {
          id: "2.11",
          text: "GENEX - External Interfaces",
          icon: "fas fa-folder-open",
          link: "/Menu/2.11",
          favourite: false, items: []
        },
        {
          id: "2.12",
          text: "Relationships",
          icon: "fas fa-folder-open",
          link: "/Menu/2.12",
          favourite: false, items: []
        },
        {
          id: "2.13",
          text: "System Administrator",
          icon: "fas fa-folder-open",
          link: "/Menu/2.13",
          favourite: false,
          items: [
            {
              id: "2.13.1",
              text: "Global Environment Maint/List",
              icon: "fas fa-file-alt",
              link: "/Menu/2.13.1",
              favourite: false, items: []
            },
            {
              id: "2.13.2",
              text: "General Ledger Audit Report",
              icon: "fas fa-file-invoice-dollar",
              link: "/Menu/2.13.2",
              favourite: false, items: []
            },
            {
              id: "2.13.3",
              text: "Owner Code Maintenance",
              icon: "fas fa-cog",
              link: "/Menu/2.13.3",
              favourite: false, items: []
            },
            {
              id: "2.13.4",
              text: "Owner Code Inq/List",
              icon: "fas fa-file-alt",
              link: "/Menu/2.13.4",
              favourite: false, items: []
            },
            {
              id: "2.13.5",
              text: "User Profile Maintenance",
              icon: "fas fa-cog",
              link: "/Menu/2.13.5",
              favourite: false, items: []
            },
            {
              id: "2.13.6",
              text: "User Profile Inq/List",
              icon: "fas fa-file-alt",
              link: "/Menu/2.13.6",
              favourite: false, items: []
            },
            {
              id: "2.13.7",
              text: "Profile Security Report",
              icon: "fas fa-cog",
              link: "/Menu/2.13.7",
              favourite: false, items: []
            },
            {
              id: "2.13.8",
              text: "Journal Security by User",
              icon: "fas fa-file-alt",
              link: "/Menu/2.13.8",
              favourite: false, items: []
            },
            {
              id: "2.13.9",
              text: "Journal Security by User Inq/List",
              icon: "fas fa-cog",
              link: "/Menu/2.13.9",
              favourite: false, items: []
            },
            {
              id: "2.13.10",
              text: "Transfer Audit Processing",
              icon: "fas fa-folder-open",
              link: "/Menu/2.13.10",
              favourite: false, items: []
            },
            {
              id: "2.13.11",
              text: "Account Data Verification Report",
              icon: "fas fa-file-invoice-dollar",
              link: "/Menu/2.13.11",
              favourite: false, items: []
            },
            {
              id: "2.13.12",
              text: "Rebuild Shadow Table",
              icon: "fas fa-upload",
              link: "/Menu/2.13.12",
              favourite: false, items: []
            },
            {
              id: "2.13.13",
              text: "Universal Utilities",
              icon: "fas fa-folder-open",
              link: "/Menu/2.13.13",
              favourite: false,
              items: [
                {
                  id: "2.13.13.1",
                  text: "User File Maintenance",
                  icon: "fas fa-cog",
                  link: "/Menu/2.13.13.1",
                  favourite: false, items: []
                },
                {
                  id: "2.13.13.2",
                  text: "User File Inquiry/List",
                  icon: "fas fa-file-alt",
                  link: "/Menu/2.13.13.2",
                  favourite: false, items: []
                },
                {
                  id: "2.13.13.3",
                  text: "Menu File Maintenance",
                  icon: "fas fa-cog",
                  link: "/Menu/2.13.13.3",
                  favourite: false, items: []
                },
                {
                  id: "2.13.13.4",
                  text: "Menu File Print",
                  icon: "fas fa-file-invoice-dollar",
                  link: "/Menu/2.13.13.4",
                  favourite: false, items: []
                },
                {
                  id: "2.13.13.5",
                  text: "Database Map Maintenance",
                  icon: "fas fa-cog",
                  link: "/Menu/2.13.13.5",
                  favourite: false, items: []
                },
                {
                  id: "2.13.13.6",
                  text: "MAP Maintenance",
                  icon: "fas fa-folder-open",
                  link: "/Menu/2.13.13.6",
                  favourite: false, items: []
                },
                {
                  id: "2.13.13.7",
                  text: "Global Variable Maintenance",
                  icon: "fas fa-cog",
                  link: "/Menu/2.13.13.7",
                  favourite: false, items: []
                },
                {
                  id: "2.13.13.8",
                  text: "Global Variable Inq/List",
                  icon: "fas fa-file-alt",
                  link: "/Menu/2.13.13.8",
                  favourite: false, items: []
                },
                {
                  id: "2.13.13.9",
                  text: "Soft Screen Maintenance",
                  icon: "fas fa-wrench",
                  link: "/Menu/2.13.13.9",
                  favourite: false, items: []
                },
                {
                  id: "2.13.13.10",
                  text: "Restart Recovery",
                  icon: "fas fa-cog",
                  link: "/Menu/2.13.13.10",
                  favourite: false, items: []
                },
                {
                  id: "2.13.13.11",
                  text: "System Utilities Menu",
                  icon: "fas fa-folder-open",
                  link: "/Menu/2.13.13.11",
                  favourite: false, items: []
                },
                {
                  id: "2.13.13.12",
                  text: "Print Audit File",
                  icon: "fas fa-file-invoice-dollar",
                  link: "/Menu/2.13.13.12",
                  favourite: false, items: []
                },
                {
                  id: "2.13.13.13",
                  text: "EPIC in UV",
                  icon: "fas fa-folder-open",
                  link: "/Menu/2.13.13.13",
                  favourite: false, items: []
                }
              ]
            },
            {
              id: "2.13.14",
              text: "EPIC in GL",
              icon: "fas fa-folder-open",
              link: "/Menu/2.13.14",
              favourite: false, items: []
            }
          ]
        },
        {
          id: "2.14",
          text: "Encumbrance Processing",
          icon: "fas fa-folder-open",
          link: "/Menu/2.14",
          favourite: false, items: []
        }
      ]
    },
    {
      id: "3",
      text: "Accounts Payable",
      icon: "fas fa-money-bill-alt",
      link: "/Menu/3",
      items: []
    },
    {
      id: "4",
      text: "Accounts Receivable",
      icon: "fas fa-cart-arrow-down",
      link: "/Menu/4",
      items: []
    },
    {
      id: "5",
      text: "Time Billing",
      icon: "fas fa-clock",
      link: "/Menu/5",
      items: []
    },
    {
      id: "6",
      text: "VAT Module",
      icon: "fas fa-percentage",
      link: "/Menu/6",
      items: []
    },
    {
      id: "7",
      text: "Purchasing",
      icon: "fas fa-hand-holding-usd",
      link: "/Menu/7",
      items: []
    },
    {
      id: "8",
      text: "Fixed Assets",
      icon: "fas fa-boxes",
      link: "/Menu/8",
      items: []
    },
    {
      id: "9",
      text: "Universal Utilities",
      icon: "fas fa-cog",
      link: "/Menu/9",
      items: []
    },
    {
      id: "10",
      text: "Job Processor",
      icon: "fas fa-server",
      link: "/Menu/10",
      items: []
    },
    {
      id: "11",
      text: "Workflow",
      icon: "fas fa-project-diagram",
      link: "/Menu/11",
      items: []
    },
    {
      id: "12",
      text: "Inventory",
      icon: "fas fa-archive",
      link: "/Menu/12",
      items: []
    },
    {
      id: "13",
      text: "Reports",
      icon: "fas fa-file-invoice-dollar",
      link: "/Menu/13",
      items: []
    }
  ]
};
