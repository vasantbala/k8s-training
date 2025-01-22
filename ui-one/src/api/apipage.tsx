import React from "react";
import axios from "axios";

function ApiPage() {
    const api_one_url = process.env.REACT_APP_API_ONE_URL || "";
    const api_two_url = process.env.REACT_APP_API_TWO_URL || "";

    const [api_one_result, setApiOneResult] = React.useState<string | null>(null);

    React.useEffect(() => {
        axios.get(api_one_url)
            .then((response) => setApiOneResult(response.data))
            .catch((error) => {
                console.error("Error fetching data:", error);
                setApiOneResult("Error fetching data");
            });
    }, [api_one_url]);

    const [api_two_result, setApiTwoResult] = React.useState<string | null>(null);

    React.useEffect(() => {
        axios.get(api_two_url)
            .then((response) => setApiTwoResult(response.data))
            .catch((error) => {
                console.error("Error fetching data:", error);
                setApiTwoResult("Error fetching data");
            });
    }, [api_two_url]);

    return(
        <div style={{ margin: "20px 20px" }}>
            <span>Response from API ONE - {api_one_result}</span><br/>
            <span>Response from API TWO - {api_two_result}</span>
        </div>
        
    );
}

export default ApiPage;