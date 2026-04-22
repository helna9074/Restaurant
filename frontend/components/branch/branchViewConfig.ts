export const Branchsections = [
  {
    title: "Restaurant Details",
    fields: [
      {
        text: "Restaurant Name",
        key: "name",
      },
      {
        text: "Owner Name",
        key: "ownername",
      },
      {
        text: "Trande License NO.",
        key: "tradelicense",
      },
      {
        text: "Address",
        key: "address",
      },
      {
        text: "Phone",
        key: "phone",
      },
      {
        text: "Email",
        key: "email",
      },
      {
        text: "Country",
        key: "country",
      },
      {
        text: "State",
        key: "state",
      },
      {
        text: "City",
        key: "city",
      },
    ],
  },
  {
    title: "Business Hours & Orders",
    fields: [
      {
        text: "Working Days",
        key: "workingDays",
      },
      {
        text: "Opening Time",
        key: "openingtime",
      },
      {
        text: "Closing Time",
        key: "closingtime",
      },
      {
        text: "Average Prepartion Time",
        key: "pretime",
      },
      {
        text: "Minimum Order Value",
        key: "ordervalue",
      },
    ],
  },
];
export const EmployeeSections= [
  {
    title: "Personal Details",
    fields: [
      {key:"branch.name",text:"Branch Name"},
      { key: "firstName", text: "First Name" },
      { key: "lastName", text: "Last Name" },
      { key: "email", text: "Email" },
      { key: "phone", text: "Phone" },
      { key: "gender", text: "Gender" },
      { key: "nationality", text: "Nationality" },
    ],
  },
  {
    title: "Work Information",
    fields: [
      { key: "department.department", text: "Department" },
      { key: "position.position", text: "Position" },
      
      { key: "salary", text: "Salary" },
      { key: "joiningDate", text: "Joining Date" },
    ],
  },
];

