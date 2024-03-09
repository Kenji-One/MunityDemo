const SettingsForm = ({ onSave }) => {
  const [shopUrl, setShopUrl] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const handleSubmit = () => {
    onSave({ shopUrl, accessToken });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="shopUrl">Shopify Store URL:</label>
        <input
          type="text"
          id="shopUrl"
          name="shopUrl"
          value={shopUrl}
          onChange={(e) => setShopUrl(e.target.value)}
          placeholder="https://yourstore.myshopify.com"
          required
        />
      </div>
      <div>
        <label htmlFor="accessToken">Shopify Storefront Access Token:</label>
        <input
          type="text"
          id="accessToken"
          name="accessToken"
          value={accessToken}
          onChange={(e) => setAccessToken(e.target.value)}
          placeholder="Enter your storefront access token"
          required
        />
      </div>
      <button type="submit">Save Settings</button>
    </form>
  );
};

export default SettingsForm;
