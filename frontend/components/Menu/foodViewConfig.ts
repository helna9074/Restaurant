import { Section } from "@/types/menu";


export const FoodSection:Section[]=[
    {
        title:"General Information",
        fields:[{
           text:"Food Name",
            key:"foodName"
        },{
            text:"Category",
            key:"category.category"
        },{
            text:"Kitchen",
            key:"kitchen.kitchen"
        },{
            text:"Type",
            key:"foodType"
        },
          
        ]
       
    },{
         title:"Special&Offer",
         fields:[{
            text:"Special Item",
            key:"special",
            type:"boolean"
        },{
            text:"Offer Start Date",
            key:"offer.startDate",
            type:"date"
        },{
            text:"Offer End Date",
            key:"offer.endDate",
            type:"date"
        },{
            text:"Discount",
            key:"offer.discount"
        },
    ]
    },
   {
         title:"Menu Type",
         fields:[{
            text:"",
            key:"menuTypes"
         }
    ]
},{
    title:"Add-ons",
    fields:[{
        text:"",
        key:"addOn"
    }]
},{
    title:"Portion & Pricing"
    ,fields:[{
        text:"",
        key:"portions",
        type:"array"
    }]
}
]