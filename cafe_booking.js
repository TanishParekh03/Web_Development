/**
 * @param {string} cafeName      
 * @param {number} initialSeats   
 */
function initBooking(cafeName, initialSeats) {
    const key = `seats_${cafeName}`;
    sessionStorage.removeItem(key);
    let seats = parseInt(sessionStorage.getItem(key), 10);
    if (isNaN(seats)) {
      seats = initialSeats;
      sessionStorage.setItem(key, seats);
    }
  
    const display = document.getElementById('seats');
    const form    = document.getElementById('booking-form');
    const input   = document.getElementById('numSeats');
    const msg     = document.getElementById('message');
    function updateDisplay() {
      display.textContent = seats;
      input.max = seats;
      form.querySelector('button').disabled = (seats === 0);
    }
    updateDisplay();
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const toBook = parseInt(input.value, 10);
  
      if (toBook > 0 && toBook <= seats) {
        seats -= toBook;
        sessionStorage.setItem(key, seats);
        updateDisplay();
  
        msg.textContent = `✅ Successfully booked ${toBook} seat(s)!`;
        alert(`You have booked ${toBook} seat(s).\nSeats remaining: ${seats}`);
      } else {
        msg.textContent = `⚠️ Invalid number. Enter 1–${seats}.`;
        alert(`Please enter a number between 1 and ${seats}.`);
      }
    });
  }
  window.addEventListener('DOMContentLoaded', () => {
    const body    = document.body;
    const cafe    = body.dataset.cafe;                 
    const initial = parseInt(body.dataset.initialSeats, 10);
  
    if (cafe && !isNaN(initial)) {
      initBooking(cafe, initial);
    }
  });
  