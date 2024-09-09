 function addLog(message) {
    const log = document.getElementById('log');
    log.textContent += message + '\n'; // Add new log entry
    log.scrollTop = log.scrollHeight; // Scroll to the bottom
}