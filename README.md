                       Answering the specific questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Ans: getElementById:select just an element.it's unique and returns oly one element
getElementsByClass: multiple element select.return HTML collection.
querySelector: select first first match element.its return only the first element which is match,super specific. 
querySelectorAll: select all match elements .it's return nodelist


### 2. How do you create and insert a new element into the DOM?
Ans:1.create element and set innerText of innerHTML
	2.find the parent where we will add the child
	3.append the child to the parent

	const newElement = document.createElement('p');
	newElement.innerText = 'something';
	document.body.appendChild(newElement);


### 3. What is Event Bubbling? And how does it work?
Ans: Event Bubbling is process where when any event happened in the child element , this will upward step by step until reaching the root.like her parent->grandparent->document.

It work first capturing the phase , then target it and then bubbling

const parent = document.getElementById('parent');
child.addEventListener('click',function(event){
	console.log('clicked in parent');
})

const child = document.getElementById('child');
child.addEventListener('click',function(event){
	console.log('clicked in child');
})

outout: clicked in parent
		clicked in child

*In this process first event trigger in the child.Then it's bubbling to go to the parent element


### 4. What is Event Delegation in JavaScript? Why is it useful?
Ans: Event delegation is technique where we set just one event listener in its parent element without putting different different event in the child element.thats mean the work is done by the child but listener is in the parent.set the event in parent and control the child.

It,s useful because -
	-the code is more cleaner and save our time 
	-work in dynamic element
	-its improve the performance


### 5. What is the difference between preventDefault() and stopPropagation() methods?
Ans: preventDefault()is used for stop default behavior in an element which means it stop those work which browser doing it by itself.It stop the browser work.

stopPropagation() is used to stop the event bubbling. that,s mean event will not reach in the parent.It's stop the event propagating to parent elements.


 
