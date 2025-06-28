// Get DOM elements
const textInput = document.getElementById('textInput');
const output = document.getElementById('output');
const keyInfo = document.getElementById('keyInfo');
const currentTheme = document.getElementById('currentTheme');
const body = document.body;

// Vowels array for checking
const vowels = ['a', 'e', 'i', 'o', 'u'];

// Current theme tracker
let activeTheme = 'Default';

// Function to update theme display
function updateThemeDisplay(theme) {
    activeTheme = theme;
    currentTheme.textContent = theme;
}

// Function to remove all theme classes
function removeAllThemes() {
    body.classList.remove('red-theme', 'green-theme', 'blue-theme');
}

// Function to handle color changes
function changeBackground(color) {
    removeAllThemes();
    
    switch(color.toLowerCase()) {
        case 'r':
            body.classList.add('red-theme');
            updateThemeDisplay('Red');
            break;
        case 'g':
            body.classList.add('green-theme');
            updateThemeDisplay('Green');
            break;
        case 'b':
            body.classList.add('blue-theme');
            updateThemeDisplay('Blue');
            break;
    }
}

// Function to check if character is a vowel
function isVowel(char) {
    return vowels.includes(char.toLowerCase());
}

// Function to process text with vowel uppercase
function processText(text) {
    return text.split('').map(char => {
        if (isVowel(char)) {
            return char.toUpperCase();
        }
        return char;
    }).join('');
}

// Event listener for keypress on the entire document
document.addEventListener('keypress', function(event) {
    const key = event.key;
    
    // Update key info display
    keyInfo.textContent = `Key: "${key}" (Code: ${event.keyCode || event.which})`;
    
    // Check for color change keys
    if (key.toLowerCase() === 'r') {
        changeBackground('r');
        event.preventDefault(); // Prevent default if not in input
    } else if (key.toLowerCase() === 'g') {
        changeBackground('g');
        event.preventDefault();
    } else if (key.toLowerCase() === 'b') {
        changeBackground('b');
        event.preventDefault();
    }
});

// Event listener for input changes
textInput.addEventListener('input', function(event) {
    const inputText = event.target.value;
    const processedText = processText(inputText);
    
    // Update output display
    if (inputText.length > 0) {
        output.textContent = processedText;
    } else {
        output.textContent = 'Your text will appear here...';
    }
});

// Event listener for keypress specifically in the input field
textInput.addEventListener('keypress', function(event) {
    const key = event.key;
    
    // Update key info
    keyInfo.textContent = `Key: "${key}" (Code: ${event.keyCode || event.which}) - Typed in input`;
    
    // Force vowels to uppercase in real-time
    if (isVowel(key)) {
        event.preventDefault();
        const cursorPos = this.selectionStart;
        const textBefore = this.value.substring(0, cursorPos);
        const textAfter = this.value.substring(this.selectionEnd);
        
        this.value = textBefore + key.toUpperCase() + textAfter;
        this.setSelectionRange(cursorPos + 1, cursorPos + 1);
        
        // Trigger input event to update output
        this.dispatchEvent(new Event('input'));
    }
});

// Event listener for keydown to catch special keys
document.addEventListener('keydown', function(event) {
    // Handle escape key to reset theme
    if (event.key === 'Escape') {
        removeAllThemes();
        updateThemeDisplay('Default');
        keyInfo.textContent = 'Theme reset to default';
    }
});

// Focus on input when page loads
window.addEventListener('load', function() {
    textInput.focus();
    
    // Add a welcome message
    setTimeout(() => {
        keyInfo.textContent = 'Ready! Start typing or press R/G/B for themes...';
    }, 1000);
});

// Additional feature: Clear input with double click
textInput.addEventListener('dblclick', function() {
    this.value = '';
    output.textContent = 'Your text will appear here...';
    keyInfo.textContent = 'Input cleared!';
    this.focus();
});
