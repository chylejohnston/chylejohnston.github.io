export function setupCounter(elements, heading1, heading2) {
 
    const action = () => {
        heading2.innerHTML = `teehee`
        heading1.innerHTML = "It's a date"
        elements.forEach(element => {
            element.classList.add('hide')
        });
        
    }
    elements.forEach(element => element.addEventListener('click', () => action()))

  }
  