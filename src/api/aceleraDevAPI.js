import axios from "axios";
import aceleraDevConfig from "./aceleraDevConfig.json";

export default axios.create({
  baseURL: aceleraDevConfig.aceleraDevApiUrl
});
