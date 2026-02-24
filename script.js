let interviewList = [];
let rejectedList = [];
let currentStatus = 'all'

let total = document.getElementById('total');
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');

const allFilterBtn = document.getElementById('all-filter-btn')
const interviewFilterBtn = document.getElementById('interview-filter-btn')
const rejectedFilterBtn = document.getElementById('rejected-filter-btn')

const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main');
const filteredSection = document.getElementById('filtered-section')

      // count
function calculateCount() {
    total.innerText = allCardSection.children.length
    interviewCount.innerText = interviewList.length
    rejectedCount.innerText = rejectedList.length

}

calculateCount();

function updateTotal(){
    let count = allCardSection.children.length;
    total.innerText = " " + count.length;
}

updateTotal();



// filtering
function toggleStyle(id) {

    //remove blue bg for all
    allFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white')
    interviewFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white')
    rejectedFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white')

    // gray button add
    allFilterBtn.classList.add('bg-[#FFFFFF]', 'text-[#64748B]')
    interviewFilterBtn.classList.add('bg-[#FFFFFF]', 'text-[#64748B]')
    rejectedFilterBtn.classList.add('bg-[#FFFFFF]', 'text-[#64748B]')

    const selected = document.getElementById(id)

    currentStatus = id
    
    //adding blue bg for current button
    selected.classList.remove('bg-[#FFFFFF]', 'text-[#64748B]')
    selected.classList.add('bg-[#3B82F6]', 'text-white')

    if (id == 'interview-filter-btn') {
        allCardSection.classList.add('hidden')
        filteredSection.classList.remove('hidden')
        renderInterview()
    } else if (id == 'all-filter-btn') {
        allCardSection.classList.remove('hidden')
        filteredSection.classList.add('hidden')
    }else if(id == 'rejected-filter-btn'){
        allCardSection.classList.add('hidden')
        filteredSection.classList.remove('hidden')
        renderRejected()
    }


}


// Delegation
mainContainer.addEventListener('click', function (event) {
    if(event.target.classList.contains('btn-delete')){
        let card = event.target.parentNode.parentNode;
        card.remove();
        updateTotal();
    }

    if (event.target.classList.contains('interview-btn')) {
        const parentNode = event.target.parentNode.parentNode;

        const jobsName = parentNode.querySelector('.jobsName').innerText
        const jobsPosition = parentNode.querySelector('.jobsPosition').innerText
        const selary = parentNode.querySelector('.selary').innerText
        const status = parentNode.querySelector('.status').innerText
        const notes = parentNode.querySelector('.notes').innerText

        parentNode.querySelector('.status').innerHTML = 'INTERVIEW'

        const cardInfo = {
            jobsName,
            jobsPosition,
            selary,
            status:'INTERVIEW',
            notes
        }


        const jobsExist = interviewList.find(item => item.jobsName == cardInfo.jobsName)
        
        if (!jobsExist) {
            interviewList.push(cardInfo)
        }
        
        rejectedList = rejectedList.filter(item=> item.jobsName != cardInfo.jobsName)
        
        if(currentStatus == 'rejected-filter-btn'){
            renderRejected()
        }
        calculateCount()

    }else if (event.target.classList.contains('rejected-btn')) {
        const parentNode = event.target.parentNode.parentNode

        const jobsName = parentNode.querySelector('.jobsName').innerText
        const jobsPosition = parentNode.querySelector('.jobsPosition').innerText
        const selary = parentNode.querySelector('.selary').innerText
        const status = parentNode.querySelector('.status').innerText
        const notes = parentNode.querySelector('.notes').innerText

        parentNode.querySelector('.status').innerText = 'REJECTED'

        const cardInfo = {
            jobsName,
            jobsPosition,
            selary,
            status:'REJECTED',
            notes
        }


        const jobsExist = rejectedList.find(item => item.jobsName == cardInfo.jobsName)

        
        if (!jobsExist) {
            rejectedList.push(cardInfo)
        }

         interviewList = interviewList.filter(item => item.jobsName != cardInfo.jobsName)

         
         if (currentStatus == "interview-filter-btn") {
             renderInterview();
            }
            calculateCount()

    }
   
})

// html create
function renderInterview() {
    filteredSection.innerHTML = ''
    if(interviewList.length === 0 ){
        filteredSection.innerHTML = `
        <div class="bg-white w-[1110px] h-[440px] px-10 py-[120px] place-items-center mx-auto">
        <img src="sources/jobs.png" alt="">
        <h2 class="text-[24px] font-semibold text-[#002C5C] text-center ">No jobs available</h2>
        <p class="text-[16px] font-normal text-[#64748B] text-center">Check back soon for new job opportunities</p>
        </div>
        
        `
        return
    }

    for (let interview of interviewList) {
        console.log(interview);


        let div = document.createElement('div');
        div.className = 'card flex justify-between bg-white p-6 border border-solid border-[#F1F2F4]  rounded-sm'
        div.innerHTML = `
             <div class="space-y-[20px]">
                    <!-- part 1 -->
                    <div class="space-y-4">
                        <p class="jobsName text-[18px] font-semibold text-[#002C5C]">${interview.jobsName}</p>
                        <p class="jobsPosition text-[16px] font-normal text-[#64748B]">${interview.jobsPosition}</p>
                    </div>

                    <!-- part 2 -->
                        <p class="selary text-[14px] font-normal text-[#64748B]">${interview.selary}</p>
                    
                    <!-- part 3 -->
                     <div class="space-y-2">
                        <p class="status text-[14px] font-medium text-[#002C5C] bg-[#EEF4FF] w-[113px] h-9 px-3 py-2 rounded-sm">${interview.status}</p>

                        <p class="notes text-[14px] font-normal text-[#323B49]">${interview.notes}</p>
                     </div>

                     <div class="grid grid-cols-1 md:flex gap-2">
                        <button class="interview-btn border border-solid border-[#10B981] text-[14px] font-semibold text-[#10B981] px-3 py-2 w-[100px] h-9 rounded-sm">INTERVIEW</button>
                        <button class="rejected-btn border border-solid border-[#EF4444] text-[14px] font-semibold text-[#EF4444] px-3 py-2 w-[100px] h-9 rounded-sm">REJECTED</button>
                     </div>
                </div>
                <div>
                    <button class="btn-delete"><img src="sources/delete.png" alt=""></button>
                </div>
            

        `
        
        filteredSection.appendChild(div)
    }
}
function renderRejected() {
    filteredSection.innerHTML = ''
    if(rejectedList.length === 0 ){
        filteredSection.innerHTML = `
        <div class="bg-white w-[1110px] h-[440px] px-10 py-[120px] place-items-center mx-auto">
        <img src="sources/jobs.png" alt="">
        <h2 class="text-[24px] font-semibold text-[#002C5C] text-center ">No jobs available</h2>
        <p class="text-[16px] font-normal text-[#64748B] text-center">Check back soon for new job opportunities</p>
        </div>
        
        `
        return
    }

    for (let reject of rejectedList) {
        console.log(reject);


        let div = document.createElement('div');
        div.className = 'card flex justify-between bg-white p-6 border border-solid border-[#F1F2F4]  rounded-sm'
        div.innerHTML = `
             <div class="space-y-[20px]">
                    <!-- part 1 -->
                    <div class="space-y-4">
                        <p class="jobsName text-[18px] font-semibold text-[#002C5C]">${reject.jobsName}</p>
                        <p class="jobsPosition text-[16px] font-normal text-[#64748B]">${reject.jobsPosition}</p>
                    </div>

                    <!-- part 2 -->
                        <p class="selary text-[14px] font-normal text-[#64748B]">${reject.selary}</p>
                    
                    <!-- part 3 -->
                     <div class="space-y-2">
                        <p class="status text-[14px] font-medium text-[#002C5C] bg-[#EEF4FF] w-[113px] h-9 px-3 py-2 rounded-sm">${reject.status}</p>

                        <p class="notes text-[14px] font-normal text-[#323B49]">${reject.notes}</p>
                     </div>

                     <div class="grid grid-cols-1 md:flex gap-2">
                        <button class="interview-btn border border-solid border-[#10B981] text-[14px] font-semibold text-[#10B981] px-3 py-2 w-[100px] h-9 rounded-sm">INTERVIEW</button>
                        <button class="rejected-btn border border-solid border-[#EF4444] text-[14px] font-semibold text-[#EF4444] px-3 py-2 w-[100px] h-9 rounded-sm">REJECTED</button>
                     </div>
                </div>
                <div>
                    <button class="btn-delete"><img src="sources/delete.png" alt=""></button>
                </div>
            

        `
        
        filteredSection.appendChild(div)
    }
}












