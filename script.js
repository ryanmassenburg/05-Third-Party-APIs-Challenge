// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  const saveButtons = document.querySelectorAll('.btn.saveBtn.col-2.col-md-1');
  const timeBlocksText = document.querySelectorAll('.col-8.col-md-10.description');
  const timeBlocks = document.querySelectorAll('.time-block');
  const headerDate = document.querySelector('#currentDay');



  //saves text of time blocks to local storage
  saveButtons.forEach(saveButton => {
    saveButton.addEventListener('click', function() {
      localStorage.setItem(this.parentNode.getAttribute('id'), this.parentNode.querySelector('textarea').value)
    });
  });

  //sets the time for each block to past present or
  timeBlocks.forEach(function(timeBlock) {
    if (parseInt(timeBlock.getAttribute('id').split('-').pop()) < parseInt(dayjs().format('HH'))) {
      timeBlock.classList.add('past');
    }
    else if (parseInt(timeBlock.getAttribute('id').split('-').pop()) === parseInt(dayjs().format('HH'))) {
      timeBlock.classList.add('present');
    }
    else if (parseInt(timeBlock.getAttribute('id').split('-').pop()) > parseInt(dayjs().format('HH'))) {
      timeBlock.classList.add('future');
    }
  });

  //sets the value of time blocks to saves text from local storage
  timeBlocksText.forEach(function(timeBlockText) {
    timeBlockText.value = localStorage.getItem(timeBlockText.parentNode.getAttribute('id'));
  });

  //adds the current date to the header
  headerDate.textContent = dayjs().format('M/D/YYYY')
});
