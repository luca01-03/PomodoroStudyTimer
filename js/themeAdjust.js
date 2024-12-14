document.addEventListener("DOMContentLoaded", function () {
    const themeOptions = document.querySelectorAll("input[name='option']");
    document.body.classList.add("study-girl-theme");

    themeOptions.forEach((option) => {
        option.addEventListener("click", function() {
            document.body.className = '';
            switch(option.id) {
                case "salad days":
                    document.body.classList.add("salad-days-theme");
                    break;
                case "night-time-countryside":
                    document.body.classList.add("night-time-countryside-theme");
                    break;
                case "timeless-togetherness":
                    document.body.classList.add("timeless-togetherness-theme");
                    break;
                default: 
                    document.body.classList.add("study-girl-theme");
                    break;
        
            }
        })
    })

})