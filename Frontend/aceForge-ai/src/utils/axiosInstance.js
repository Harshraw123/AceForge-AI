import axios from "axios";
import { BASE_URL } from "./apiPath";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 80000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

{/*const axiosInstance = axios.create({...});
Yeh line ek special "axios" ka instance (ek copy) bana rahi hai, jismein hum kuch default settings daal rahe hain. Socho yeh tumhara khud ka customized post office ban gaya.

baseURL: BASE_URL: Iska matlab hai ki jab bhi hum koi chitti bhejenge (API call karenge), toh yeh main address apne aap uske aage lag jayega. Jaise agar tum sirf /users bhejte ho, toh woh actually https://mera-server.com/users ban jayega.
timeout: 80000: Yeh time limit hai. Agar server 80 second ke andar jawaab nahi deta hai toh yeh request cancel ho jayega.
headers: {...}: Yeh chitti ke upar kuch special labels laga raha hai.
"Content-Type": "application/json": Yeh bata raha hai ki jo data hum bhej rahe hain, woh JSON format mein hai (ek khaas tarike se likha hua data).
Accept: "application/json": Yeh bata raha hai ki hum server se jo jawaab chahte hain, woh bhi JSON format mein hona chahiye.
// Request Interceptor
Yeh ek darbaan hai jo chitti jaane se pehle usko check karta hai.

axiosInstance.interceptors.request.use((config) => { ... }, (error) => { ... });

Pehla function ((config) => { ... }) tab chalta hai jab chitti jaane ke liye taiyaar hai. Yahan pe yeh kya kar raha hai:
const accessToken = localStorage.getItem("token");: Yeh tumhare computer ke memory (local storage) se ek "token" nikal raha hai. Yeh token aksar login hone ke baad milta hai aur server ko batata hai ki tum authorized ho.
if (accessToken) { config.headers.Authorization = \Bearer ${accessToken}`; }: Agar token mil jaata hai toh yeh usko chitti ke header mein laga deta hai. Socho yeh ek special stamp hai jo server ko batata hai ki yeh chitti ek jaani-pehchaani jagah se aayi hai.Bearer` ek standard tarika hai token bhejne ka.
return config;: Chitti ko aage jaane do.
Doosra function ((error) => { ... }) tab chalta hai agar chitti taiyaar karne mein koi problem ho. Yahan pe yeh uss error ko aage bhej deta hai.
// Response Interceptor
Yeh ek aur darbaan hai jo aati hui chittiyon (server ke jawaab) ko check karta hai.

axiosInstance.interceptors.response.use((response) => { ... }, (error) => { ... });

Pehla function ((response) => { ... }) tab chalta hai jab jawaab successfully aa jaata hai. Yahan pe yeh sirf jawaab ko wapas bhej deta hai. Tum chaho toh yahan pe jawaab aane ke baad kuch processing bhi kar sakte ho.
Doosra function ((error) => { ... }) tab chalta hai agar jawaab mein koi gadbad ho (jaise server error). Yahan pe yeh uss error ko aage bhej deta hai taaki tumhara application usko handle kar sake.   */}