import { firestore, auth } from '../../firebaseConfig';  
import { doc, getDoc, collection, updateDoc, addDoc, arrayUnion, deleteDoc, increment } from 'firebase/firestore';
import { getStorage, ref, deleteObject  } from "firebase/storage";
const storage = getStorage();
//add Asset
export const addAsset = async (assetData, images, isActive,address) => {
  try {
    const ownerId = auth.currentUser.uid;
    const ownerRef = doc(firestore, 'users', ownerId); 
    const assetsCollectionRef = collection(ownerRef, 'assets');
    const assetRef = await addDoc(assetsCollectionRef, {
      ...assetData,
      ownerId,
      images,
      isActive,
      address
    });
  } catch (error) {
    console.error("Error adding asset: ", error);
    throw error;
  }
};
//add tenant
export const addTenant= async (tenantData, isActive, images,address) => {
  try {
    const ownerId = auth.currentUser.uid;
    const ownerRef = doc(firestore, 'users', ownerId); 

    const tenantCollectionRef = collection(ownerRef, 'Tenant');
    const tenantRef = await addDoc(tenantCollectionRef, {
      ...tenantData,
      isActive,
      images,
      address
    });
  } catch (error) {
    console.error("Error adding tenant: ", error);
    throw error;
  }
};
//add rental
export const addRental = async (rentalData) => {
  try {
    const ownerId = auth.currentUser.uid;
    const ownerRef = doc(firestore, 'users', ownerId); 
    const rentalCollectionRef = collection(ownerRef, 'rental');
    const rentalRef = await addDoc(rentalCollectionRef, {
      ...rentalData,
      assetId: rentalData.selectedAsset,
      tenantId: rentalData.selectedTenant,
    });
    const rentalId = rentalRef.id;
    const assetRef = doc(ownerRef, 'assets', rentalData.selectedAsset);
    const tenantRef = doc(ownerRef, 'Tenant', rentalData.selectedTenant);

    await updateDoc(assetRef, {
      rentalIds: arrayUnion(rentalId),
    });
    await updateDoc(tenantRef, {
      rentalIds: arrayUnion(rentalId),
    });
  } catch (error) {
    console.error("Error adding rental: ", error);
    throw error;
  }
};

//add report
export const addReport = async (reportData) => { 
  try {
    const ownerId = auth.currentUser.uid;
    const ownerRef = doc(firestore, 'users', ownerId); 

    const reportCollectionRef = collection(ownerRef, 'report');
    const reportRef = await addDoc(reportCollectionRef, {
      ...reportData,
      assetId: reportData.selectedAsset,
      tenantId: reportData.selectedTenant,
      ownerId:ownerId,
    });
    const reportId = reportRef.id;
    const assetRef = doc(ownerRef, 'assets', reportData.selectedAsset);
    const tenantRef = doc(ownerRef, 'Tenant', reportData.selectedTenant);

    await updateDoc(assetRef, {
      reportIds: arrayUnion( reportId),
    });
    await updateDoc(tenantRef, {
      reportIds: arrayUnion( reportId),
    });
  } catch (error) {
    console.error("Error adding report: ", error);
    throw error;
  }
};

// update Assets
export const updateAsset=async (docId,assetData,updatedImages)=>{
  try {
    const ownerId = auth.currentUser?.uid;
    const ownerRef = doc(firestore, 'users', ownerId);
    const assetDocRef = doc(ownerRef, 'assets', docId);
  const updateData = {
    ...assetData,
    images: updatedImages,
  };

    await updateDoc(assetDocRef, updateData);
    console.log('Document updated successfully');
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};
// updated Tenant
export const updateTenant = async (tenantData, docId, updatedImages) => {
  try {
    const ownerId = auth.currentUser?.uid;
    const ownerRef = doc(firestore, 'users', ownerId);
    const tenantRef = doc(ownerRef, 'Tenant', docId);
    const updateData = {
      ...tenantData,
      images: updatedImages,
    };
    await updateDoc(tenantRef, updateData);
    console.log('Document updated successfully');
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};

//delete image 
export const deleteImageFromStorage = async (imageUrl) => {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
    console.log('Image deleted successfully');
  } catch (error) {
    console.error('Error deleting image: ', error);
  }
};

export const removeImageUrlFromFirestore = async (docId, imageUrl) => {
  try {
    const ownerId = auth.currentUser?.uid;
    const ownerRef = doc(firestore, 'users', ownerId);
    const tenantRef = doc(ownerRef, 'Tenant', docId);
    const docSnapshot = await getDoc(tenantRef);
    const currentData = docSnapshot.data();
    const updatedImages = currentData.images.filter(url => url !== imageUrl);
    await updateDoc(tenantRef, { images: updatedImages });
    console.log('Image URL removed from Firestore');
  } catch (error) {
    console.error('Error removing image URL from Firestore: ', error);
  }
};

// // delete documents 
export const deleteTenant=async(docId)=>{
  try {
    const ownerId = auth.currentUser?.uid;
    const ownerRef = doc(firestore, 'users', ownerId);
    const tenantRef = doc(ownerRef, 'Tenant', docId);
    await deleteDoc(tenantRef);
    console.log('Document delete successfully');
  } catch (error) {
    console.error('Error delete document: ', error);
  }
}
export const deleteAsset=async(docId)=>{
  try {
    const ownerId = auth.currentUser?.uid;
    const ownerRef = doc(firestore, 'users', ownerId);
  const assetRef = doc(ownerRef, 'assets', docId);
   await deleteDoc(assetRef);
    console.log('Document delete successfully');
  } catch (error) {
    console.error('Error delete document: ', error);
  }
}
//expenses 
export const addExpense=async(expenseData,docId)=>{
  try {
    const ownerId = auth.currentUser?.uid;
    const ownerRef = doc(firestore, 'users', ownerId);
    const rentalRef = doc(ownerRef, 'rental', docId);
    await updateDoc(rentalRef,{
      Expenses: arrayUnion(expenseData),
    totalExpenses: increment(expenseData.amount)
  })
    console.log(' successfully add expenses');
  } catch (error) {
    console.error('Error : ', error);
  }
}
//payment
export const addPayment=async(paymentData,docId)=>{
  try {
    const ownerId = auth.currentUser?.uid;
    const ownerRef = doc(firestore, 'users', ownerId);
    const rentalRef = doc(ownerRef, 'rental', docId);
    await updateDoc(rentalRef,{
      payments: arrayUnion(paymentData),
    totalPayment: increment(paymentData.amount)
  })
    console.log(' successfully add payment');
  } catch (error) {
    console.error('Error : ', error);
  }
}