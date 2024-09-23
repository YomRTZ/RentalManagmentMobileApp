import React,{createContext,useState} from "react";
export const GlobalContextApi=createContext();
 export const GlobalContextApiProvider=({children})=>{
const [assets, setAssets] = useState([]);
const [tenants, setTenants] = useState([]);
const [rentals, setRentals] = useState([]);
const[error,setError]=useState("");
const[success,setSuccess]=useState("");
const[address,setAddress]=useState({
  country:"",
  state:"",
  city:"",
  addressLine:""
})
const[ updatedImages, setupdatedImages]=useState([]);
// const [currentUser, setCurrentUser] = useState();
//AddAsset State Variable
const[assetData,setAssetData]=useState({
assetType:"",
assetName:"", 
assetDescription:"",
productStatuse:"",
rentalDateType:"",
rentalDefaultAmount:"",
})
const[isActive,setIsActive]=useState('false');

//AddRental State Variable 
const[rentalData,setRentalData]=useState({
  selectedAsset:"",
  selectedTenant:"",
  rentalFrequency:"Daily",
  amount:"",
  rentalDescription:"",
  duration:"",
  leaseStart: new Date(),
  leaseEnd: new Date(),
  billingCycle: new Date(),
})
const [showLeaseStartPicker, setShowLeaseStartPicker] = useState(false);
const [showLeaseEndPicker, setShowLeaseEndPicker] = useState(false);
const [showBillingCyclePicker, setShowBillingCyclePicker] = useState(false);
//AddTenante State Variable
const[tenantData,setTenantData]=useState({
  firstName:"",
  lastName:"",
  genderType:"",
  phoneNumber:"",
  emailAddress:"",
})
//Switch State Variable 

//Image State Variable
const [images, setImages] = useState([]);
  return(
    
    <GlobalContextApi.Provider value={{
      //user
      // currentUser, setCurrentUser,
       //Asset
assetData,setAssetData,
error,setError,
success,setSuccess,
//Rental
rentalData,setRentalData,
showLeaseStartPicker, setShowLeaseStartPicker,
showLeaseEndPicker, setShowLeaseEndPicker,
showBillingCyclePicker, setShowBillingCyclePicker,
//Tenant
tenantData,setTenantData,
//Address
address,setAddress,
//Switch
isActive, setIsActive,
//Image 
images, setImages,
updatedImages, setupdatedImages,
rentals, setRentals,
tenants, setTenants,
assets, setAssets,
    }}>
      {children}
    </GlobalContextApi.Provider>
  )
}

