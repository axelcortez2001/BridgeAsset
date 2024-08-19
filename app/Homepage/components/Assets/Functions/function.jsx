// export const handleDeleteAsset = async () => {
//     if (window.confirm("Are you sure you want to change current selected?")) {
//         if (asset !== null) {
//           const _id = asset._id;
//           const res = await deleteAssetData(_id);
//           if (res?.success === true) {
//             await setDataToDefault();
//             setSelectedAssetData(null);
//             await fetchEmployees(category);
//             toast.success("Asset deleted successfully.");
//           } else {
//             console.error("Failed to delete asset", res);
//             toast.success("Failed to delete asset.");
//           }
//         }
//       }
// }