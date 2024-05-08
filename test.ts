// featureSettings = [
//   {
//     featureName: "Location Details",
//     adminVisibility: true,
//     adminEditable: true,
//     authorVisibility: false,
//     authorEditable: false,
//     subFeature: [
//       {
//         featureName: "Features",
//         adminVisibility: true,
//         adminEditable: true,
//         authorVisibility: true,
//         authorEditable: true,
//         fieldName: [
//           {
//             name: "Feature Name",
//             adminVisibility: true,
//             adminEditable: true,
//             authorVisibility: true,
//             authorEditable: true,
//           },
//           {
//             name: "Feature Type",
//             adminVisibility: true,
//             adminEditable: true,
//             authorVisibility: true,
//             authorEditable: true,
//           },
//           {
//             name: "Feature Status",
//             adminVisibility: true,
//             adminEditable: true,
//             authorVisibility: true,
//             authorEditable: true,
//           },
//         ],
//       },
//       {
//         featureName: "Operations",
//         adminVisibility: true,
//         adminEditable: true,
//         authorVisibility: true,
//         authorEditable: false,
//         fieldName: [
//           {
//             name: "Operation Name",
//             adminVisibility: true,
//             adminEditable: true,
//             authorVisibility: true,
//             authorEditable: false,
//           },
//           {
//             name: "Operation Type",
//             adminVisibility: true,
//             adminEditable: true,
//             authorVisibility: true,
//             authorEditable: false,
//           },
//           {
//             name: "Operation Status",
//             adminVisibility: true,
//             adminEditable: true,
//             authorVisibility: true,
//             authorEditable: false,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     featureName: "Subscriptions",
//     adminVisibility: true,
//     adminEditable: false,
//     authorVisibility: true,
//     authorEditable: true,
//     subFeature: [
//       {
//         featureName: "Subscription Dashboard",
//         adminVisibility: true,
//         adminEditable: true,
//         authorVisibility: true,
//         authorEditable: false,
//         fieldName: [
//           {
//             name: "Subscription ID",
//             adminVisibility: true,
//             adminEditable: true,
//             authorVisibility: true,
//             authorEditable: false,
//           },
//           {
//             name: "Subscription Status",
//             adminVisibility: true,
//             adminEditable: true,
//             authorVisibility: true,
//             authorEditable: false,
//           },
//           {
//             name: "Subscription Date",
//             adminVisibility: true,
//             adminEditable: true,
//             authorVisibility: true,
//             authorEditable: false,
//           },
//         ],
//       },
//       {
//         featureName: "Subscription Products",
//         adminVisibility: true,
//         adminEditable: false,
//         authorVisibility: false,
//         authorEditable: false,
//         fieldName: [
//           {
//             name: "Product ID",
//             adminVisibility: true,
//             adminEditable: true,
//             authorVisibility: false,
//             authorEditable: false,
//           },
//           {
//             name: "Product Name",
//             adminVisibility: true,
//             adminEditable: true,
//             authorVisibility: false,
//             authorEditable: false,
//           },
//           {
//             name: "Product Price",
//             adminVisibility: true,
//             adminEditable: true,
//             authorVisibility: false,
//             authorEditable: false,
//           },
//         ],
//       },
//     ],
//   },
// ];

// const fruits =[{ roll:"1",name:"sohan",address:"delhi"},
// { roll:"2",name:"Mango",address:"japan"},
// { roll:"3",name:"rohan",address:"goa"},
// { roll:"4",name:"ram",address:"mumbai"}];

//  fruits.map((fruit) => 
//     <div key={fruit.roll} >
//         {fruit}
//     </div>)



type Vegetable = { name: string, color?: string };

const vegetable: Vegetable[] = [{ name: "tomato" },
                              { name: "potato", color: "yellow" }];

const toys:String[] =["plastic","iron"] 