import { get, post, del, put } from "aws-amplify/api";

export async function restInsert(path, request) {
  try {
    const insertOperation = post({
      apiName: "BridgeAssetAPI",
      path: path,
      options: {
        body: request,
      },
    });
    const { body } = await insertOperation.response;
    return await body.json();
  } catch (e) {
    console.log(e);
  }
}
export async function getAssets() {
  try {
  } catch (e) {
    console.log("GET call failed: ", JSON.parse(e.response.body));
  }
}

export async function postAsset() {
  try {
  } catch (e) {
    console.log("POST call failed: ", JSON.parse(e.response.body));
  }
}

export async function updateAsset() {
  try {
  } catch (e) {
    console.log("PUT call failed: ", JSON.parse(e.response.body));
  }
}

export async function deleteAsset() {
  try {
  } catch (e) {
    console.log("DEL call failed: ", JSON.parse(e.response.body));
  }
}

export async function getUsers(path) {
  try {
    const getOperation = get({
      apiName: "BridgeAssetAPI",
      path: path,
    });
    const { body } = await getOperation.response;
    return await body.json();
  } catch (e) {
    console.log("Get call failed: ", JSON.parse(e.response.body));
  }
}
