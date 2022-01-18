import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";

// ヘッダーはケバブケースのままにする
const options = {
  ignoreHeaders: true,
};

// URLの共通部分を設定
const client = applyCaseMiddleware(axios.create({
  baseURL: "http://localhost:3001/"
}), options)

export default client;