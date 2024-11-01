const apiKey = "f83ed935b4792e31e457aac3"
        const url = 'https://v6.exchangerate-api.com/v6/f83ed935b4792e31e457aac3/latest/USD?=${f83ed935b4792e31e457aac3}';

        document.getElementById('converterForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const amount = document.getElementById('amount').value;
            const fromCurrency = document.getElementById('fromCurrency').value;
            const toCurrency = document.getElementById('toCurrency').value;
            
            convertCurrency(amount, fromCurrency, toCurrency);
        });

        async function convertCurrency(amount, fromCurrency, toCurrency) {
            const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`;
            
            try {
                const response = await fetch(url);
                const data = await response.json();
                
                if (data.result === "success") {
                    const rate = data.conversion_rate;
                    const convertedAmount = (amount * rate).toFixed(2);
                    document.getElementById('result').innerText = 
                        `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
                } else {
                    document.getElementById('result').innerText = 
                        "Error: Unable to fetch exchange rate.";
                }
            } catch (error) {
                document.getElementById('result').innerText = "Error: Something went wrong.";
                console.error("Error fetching exchange rate:", error);
            }
        }