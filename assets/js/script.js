/* VARIABLES */
const areas = {
  a: null,
  b: null,
  c: null
};

/* FUNCTIONS QUERY'S */
const query = element => document.querySelector(element);
const queryAll = element => document.querySelectorAll(element);

/* FUNCTIONS */
const dragStart = e => e.currentTarget.classList.add('dragging');
const dragEnd = e => e.currentTarget.classList.remove('dragging');
const dragLeave = e => e.currentTarget.classList.remove('hover');

const dragOver = e => {
  if (e.currentTarget.querySelector('.item') === null) {
    e.preventDefault();
    e.currentTarget.classList.add('hover');
  }
};

const drop = e => {
  e.currentTarget.classList.remove('hover');

  if (e.currentTarget.querySelector('.item') === null) {
    const dragItem = query('.item.dragging');
    e.currentTarget.appendChild(dragItem);
    updateAreas();
  }
};

/* FUNCTIONS NEUTRAL AREA */
const dragOverNeutral = e => {
  e.preventDefault();
  e.currentTarget.classList.add('hover');
};

const dragLeaveNeutral = e => e.currentTarget.classList.remove('hover');

const dropNeutral = e => {
  e.currentTarget.classList.remove('hover');

  const dragItem = query('.item.dragging');
  e.currentTarget.appendChild(dragItem);
  updateAreas();
};

/* LOGIC FUNCTION  */
const updateAreas = () => {
  queryAll('.area').forEach(area => {
    let name = area.getAttribute('data-name');

    if (area.querySelector('.item') !== null) {
      areas[name] = area.querySelector('.item').innerHTML;
    } else {
      areas[name] = null;
    }
  });

  areas.a === '1' && areas.b === '2' && areas.c === '3'
    ? query('.areas').classList.add('correct')
    : query('.areas').classList.remove('correct');
};

/* EVENTS */
queryAll('.item').forEach(item => {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
});

queryAll('.area').forEach(area => {
  area.addEventListener('dragover', dragOver);
  area.addEventListener('dragleave', dragLeave);
  area.addEventListener('drop', drop);
});

query('.neutralArea').addEventListener('dragover', dragOverNeutral);
query('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
query('.neutralArea').addEventListener('drop', dropNeutral);
