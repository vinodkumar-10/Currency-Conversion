#Currency Converter Web App (React)

This is a simple, responsive currency conversion web application built using React.js. It converts an amount from one currency to another using static exchange rates loaded from a local `rates.json` file and caches the results using memory and `localStorage`.

## 📁 Folder Structure

```
currency-converter-app/
├── public/
│   └── rates.json           # Static JSON with exchange rates & currency names
├── src/
│   ├── components/
│   │   └── CurrencyForm.jsx  # Main UI component
│   ├── services/
│   │   └── currencyService.js # Rate fetching with cache logic
│   ├── viewmodel/
│   │   └── CurrencyViewModel.js # Currency conversion logic
│   ├── App.jsx               # Root component
│   ├── main.jsx              # App entry point
│   └── styles.css            # Responsive and functional styling
├── package.json
└── README.md
```

## 🚀 Features

- Convert any amount between supported currencies.
- Smart data source (in-memory cache → localStorage → static JSON).
- Responsive design, mobile-friendly.
- Easy to extend with real-time APIs.

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/vinodkumar-10/Currency-Conversion.git
cd currency-converter-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

The app will be available at: [http://localhost:5173](http://localhost:5173)

## 📦 Build for Production

```bash
npm run build
```

## 🧪 How It Works

- Rates are stored in `public/rates.json`:

```json
{
  "rates": {
    "USD": 1,
    "INR": 83.2,
    "EUR": 0.91
  },
  "currencies": {
    "USD": "US Dollar",
    "INR": "Indian Rupee",
    "EUR": "Euro"
  }
}
```

- The app tries to convert like this:

```
Step 1: Check memory cache (fastest)
Step 2: Check localStorage (persistent)
Step 3: Load from JSON (fallback)
```

## 📤 Example Conversion

### Input:

- From: USD - US Dollar
- To: INR - Indian Rupee
- Amount: 10

### Response (Output UI):

```
Result: 832.00 (json)
```

If you run the same conversion again:

```
Result: 832.00 (cache)
```

## 📚 Technologies Used

- React.js (Vite)
- JavaScript (ES6+)
- HTML/CSS
- localStorage + in-memory cache

## 🧠 Future Improvements

- Add real-time exchange rate API (e.g. exchangerate.host, Fixer.io)
- Add currency flags/icons
- Add recent history or save favorites
- Add dark mode

## 🧪 Testing the Converter

Manual Testing Steps:

1. Select `From` and `To` currencies
2. Enter amount
3. Click `Convert`
4. Check the displayed result and source

To test caching:
- Convert USD to INR (should show `json`)
- Convert again (should show `cache`)





## 🙌 Credits

Developed by Vinod Kumar as a beginner MERN project.
