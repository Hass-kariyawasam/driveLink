// Firebase configuration (replace with your Firebase project's config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
  
  // Register a new user
  document.getElementById("register-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const vehicleModel = document.getElementById("vehicle-model").value;
  
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        db.collection("users").doc(user.uid).set({
          email: email,
          vehicleModel: vehicleModel
        });
        alert("Registration successful!");
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  });
  
  // Login an existing user
  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
  
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert("Login successful!");
        document.getElementById("auth-section").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
        fetchVehicleData(userCredential.user.uid);
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  });
  
  // Fetch and display vehicle data
  function fetchVehicleData(userUID) {
    db.collection("users").doc(userUID).collection("vehicleData")
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          document.getElementById("fuel-level").innerText = data.fuelLevel;
          document.getElementById("gps").innerText = data.gps;
          document.getElementById("rpm").innerText = data.rpm;
        });
      });
  }