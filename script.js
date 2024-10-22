const addEventBtn = document.getElementById("add-event");
const mainEle = document.getElementById("main");

let eventNumber = 0;

const addEvent = () => {
  const currentEventNumber = ++eventNumber;
  const eventEle = document.createElement("div");
  eventEle.id = `event-${currentEventNumber}`;
  eventEle.className = "event";

  eventEle.innerHTML = `
  <h2 class="eventNumber">Event Number: ${currentEventNumber}</h2>
  <div class="eventName">
    <span class="event-label">Event Name:</span>
    <input type="text" id="event-name-${currentEventNumber}" class="input-box"/>
  </div>
  <div class="eventTimer">
    <span class="event-label">Enter Time:</span>
    <input type="text" id="event-time-${currentEventNumber}" class="input-box"/>
  </div>
  <div class="buttons">
    <button id="start-${currentEventNumber}"  class="btn">Start</button>
    <button id="delete-${currentEventNumber}" class="btn">Delete</button>
  </div>
  <div id="timer-box-${currentEventNumber}">
  </div>
  
  `;
  mainEle.appendChild(eventEle);
  const deleteEventBtn = document.getElementById(
    `delete-${currentEventNumber}`
  );

  deleteEventBtn.addEventListener("click", () => {
    mainEle.removeChild(eventEle);
  });

  const eventNameElement = document.getElementById(
    `event-name-${currentEventNumber}`
  );
  let timers = [];
  const addTimer = () => {
    const timerBox = document.getElementById(`timer-box-${currentEventNumber}`);
    let timerId = Date.now();
    const timerEle = document.createElement("div");
    timerEle.className = "timerEle";
    timerEle.innerHTML = `
        <span class="event-name" id="event-name-text-${currentEventNumber}-${timerId}"></span>
        <span class="event-time" id="event-timer-text-${currentEventNumber}-${timerId}"></span>
      `;
    timerBox.appendChild(timerEle);
    const eventNameText = eventNameElement.value.trim() + ": ";
    const findTimer = timers.find((t) => t.eventName == eventNameText);

    if (findTimer) {
      startCountDown(findTimer.eventNumber, findTimer.timerId);
    } else {
      document.getElementById(
        `event-name-text-${currentEventNumber}-${timerId}`
      ).textContent = eventNameText;
      startCountDown(currentEventNumber, timerId);
      timers.push({
        timerId: timerId,
        eventName: eventNameText,
        eventNumber: currentEventNumber,
      });
    }
  };

  document
    .getElementById(`start-${currentEventNumber}`)
    .addEventListener("click", addTimer);
};
addEvent();
addEventBtn.addEventListener("click", addEvent);

const startCountDown = (eventNumber, timerId) => {
  const eventTimeElement = document.getElementById(`event-time-${eventNumber}`);
  let timerText = eventTimeElement.value.trim();
  document.getElementById(
    `event-timer-text-${eventNumber}-${timerId}`
  ).innerHTML = timerText + " seconds remaining";
  const countDown = setInterval(() => {
    timerText--;
    document.getElementById(
      `event-timer-text-${eventNumber}-${timerId}`
    ).innerHTML = timerText + " seconds remaining";

    if (timerText <= 0) {
      document.getElementById(
        `event-timer-text-${eventNumber}-${timerId}`
      ).innerHTML = timerText + " seconds remaining";
      clearInterval(countDown);
      const eventName = document.getElementById(
        `event-name-text-${eventNumber}-${timerId}`
      ).textContent;
      alert(
        `Time's Up for event ${eventName.slice(
          0,
          eventName.length - 2
        )} and event number ${eventNumber}`
      );
    }
  }, 1000);
};
