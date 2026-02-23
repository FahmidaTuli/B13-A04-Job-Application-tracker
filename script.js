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


function calculateCount() {
    total.innerText = allCardSection.children.length
    interviewCount.innerText = interviewList.length
    rejectedCount.innerText = rejectedList.length

}

calculateCount();

function toggleStyle(id) {

    //adding gray bg for all
    allFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white')
    interviewFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white')
    rejectedFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white')

    //if any button has black then remove
    allFilterBtn.classList.add('bg-[#FFFFFF]', 'text-[#64748B]')
    interviewFilterBtn.classList.add('bg-[#FFFFFF]', 'text-[#64748B]')
    rejectedFilterBtn.classList.add('bg-[#FFFFFF]', 'text-[#64748B]')

    // console.log(id);

    const selected = document.getElementById(id)
    currentStatus = id
    // console.log(selected);

    //adding black bg for current button
    selected.classList.remove('bg-[#FFFFFF]', 'text-[#64748B]')
    selected.classList.add('bg-[#3B82F6]', 'text-white')

    if (id == 'interview-filter-btn') {
        allCardSection.classList.add('hidden')
        filteredSection.classList.remove('hidden')
    } else if (id == 'all-filter-btn') {
        allCardSection.classList.remove('hidden')
        filteredSection.classList.add('hidden')
    }else if(id == 'rejected-filter-btn'){
        allCardSection.classList.add('hidden')
        filteredSection.classList.remove('hidden')
        renderRejected()
    }


}

mainContainer.addEventListener('click', function (event) {


    if (event.target.classList.contains('interview-btn')) {
        const parentNode = event.target.parentNode.parentNode
        const jobsName = parentNode.querySelector('.jobsName').innerText
        const jobsPosition = parentNode.querySelector('.jobsPosition').innerText
        const selary = parentNode.querySelector('.selary').innerText
        const status = parentNode.querySelector('.status').innerText
        const notes = parentNode.querySelector('.notes').innerText

        parentNode.querySelector('.status').innerText = 'Interview'

        const cardInfo = {
            jobsName,
            jobsPosition,
            selary,
            status:'Interview',
            notes
        }


        const jobsExist = interviewList.find(item => item.jobsName == cardInfo.jobsName)
        
        if (!jobsExist) {
            interviewList.push(cardInfo)
        }
        rejectedList = rejectedList.filter(item=> item.jobsName != cardInfo.jobsName)
        calculateCount()

        renderInterview()
    }else if (event.target.classList.contains('rejected-btn')) {
        const parentNode = event.target.parentNode.parentNode
        const jobsName = parentNode.querySelector('.jobsName').innerText
        const jobsPosition = parentNode.querySelector('.jobsPosition').innerText
        const selary = parentNode.querySelector('.selary').innerText
        const status = parentNode.querySelector('.status').innerText
        const notes = parentNode.querySelector('.notes').innerText

        parentNode.querySelector('.status').innerText = 'Rejected'

        const cardInfo = {
            jobsName,
            jobsPosition,
            selary,
            status:'Rejected',
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


function renderInterview() {
    filteredSection.innerHTML = ''

    for (let interview of interviewList) {
        console.log(interview)


        let div = document.createElement('div');
        div.className = 'card flex justify-between bg-white p-6 border border-solid border-[#F1F2F4]  rounded-sm'
        div.innerHTML = `
             <div class="space-y-[20px]">
                    <!-- part 1 -->
                    <div class="space-y-4">
                        <p class="jobsName text-[18px] font-semibold text-[#002C5C]">${interview.jobsName}</p>
                        <p class="jobsPosition text-[16px] font-normal text-[#64748B]">React Native Developer</p>
                    </div>

                    <!-- part 2 -->
                        <p class="selary text-[14px] font-normal text-[#64748B]">Remote • Full-time • $130,000 - $175,000</p>
                    
                    <!-- part 3 -->
                     <div class="space-y-2">
                        <p class="status text-[14px] font-medium text-[#002C5C] bg-[#EEF4FF] w-[113px] h-9 px-3 py-2 rounded-sm">${interview.status}</p>

                        <p class="notes text-[14px] font-normal text-[#323B49]">Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.</p>
                     </div>

                     <div class="grid grid-cols-1 md:flex gap-2">
                        <button class="interview-btn border border-solid border-[#10B981] text-[14px] font-semibold text-[#10B981] px-3 py-2 w-[100px] h-9 rounded-sm">INTERVIEW</button>
                        <button class="rejected-btn border border-solid border-[#EF4444] text-[14px] font-semibold text-[#EF4444] px-3 py-2 w-[100px] h-9 rounded-sm">REJECTED</button>
                     </div>
        `

        filteredSection.appendChild(div)
    }
}
function renderRejected() {
    filteredSection.innerHTML = ''

    for (let reject of rejectedList) {
       
        let div = document.createElement('div');
        div.className = 'card flex justify-between bg-white p-6 border border-solid border-[#F1F2F4]  rounded-sm'
        div.innerHTML = `
             <div class="space-y-[20px]">
                    <!-- part 1 -->
                    <div class="space-y-4">
                        <p class="jobsName text-[18px] font-semibold text-[#002C5C]">${reject.jobsName}</p>
                        <p class="jobsPosition text-[16px] font-normal text-[#64748B]">React Native Developer</p>
                    </div>

                    <!-- part 2 -->
                        <p class="selary text-[14px] font-normal text-[#64748B]">Remote • Full-time • $130,000 - $175,000</p>
                    
                    <!-- part 3 -->
                     <div class="space-y-2">
                        <p class="status text-[14px] font-medium text-[#002C5C] bg-[#EEF4FF] w-[113px] h-9 px-3 py-2 rounded-sm">${reject.status}</p>

                        <p class="notes text-[14px] font-normal text-[#323B49]">Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.</p>
                     </div>

                     <div class="grid grid-cols-1 md:flex gap-2">
                        <button class="interview-btn border border-solid border-[#10B981] text-[14px] font-semibold text-[#10B981] px-3 py-2 w-[100px] h-9 rounded-sm">INTERVIEW</button>
                        <button class="rejected-btn border border-solid border-[#EF4444] text-[14px] font-semibold text-[#EF4444] px-3 py-2 w-[100px] h-9 rounded-sm">REJECTED</button>
                     </div>
        `

        filteredSection.appendChild(div)
    }
}



