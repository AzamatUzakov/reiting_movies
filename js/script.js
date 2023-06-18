import {
    movies
} from "./db.js";

let ul = document.querySelector('.promo__interactive-list')
let bac = document.querySelector('.promo__bg')
let gen = document.querySelector('.promo__genre')
let title = document.querySelector('.promo__title')
let text = document.querySelector('.promo__descr')
let IMBd = document.querySelector('.IMBd')
let kinopoisk = document.querySelector('.kinopoisk')
let searchInput = document.querySelector('#searchInput')
let gen_ul = document.querySelector('.promo__menu-list ul')
//let modal = document.querySelector('.dots_modal')
//let basket = document.querySelector('.basket')
//let edit = document.querySelector('.edit')

let genres = movies.map(item => item.Genre)
genres = ['All', ...new Set(genres)]
console.log(genres);
searchInput.oninput = () => {
    let query = searchInput.value.toLowerCase().trim()

    let filtered = movies.filter(item => {
        let title = item.Title.toLowerCase()
        if (title.includes(query)) {
            return item
        }
    })

    reload(filtered)
}

let filterfordel = [...movies]
reload(filterfordel.sort((atitel, btitel) => atitel.Title > btitel.Title ? 1 : -1))

function reload(data) {
    ul.innerHTML = ""

    setMovieData(data[0])

    for (let item of data) {
        let li = document.createElement('li')
        let deletee = document.createElement('div')
        let edit = document.createElement('div')

        li.classList.add('promo__interactive-item')
        deletee.classList.add('delete')
        edit.classList.add('edit')

        li.style.cursor = 'pointer'

        li.innerHTML = item.Title

        li.append(deletee, edit)
        ul.append(li)




        deletee.onclick = () => {
            filterfordel = filterfordel.filter(el => el.ID !== item.ID)
            reload(filterfordel)
        }


        /*   deletee.onclick = () => {
              modal.style.display = 'block'
          }
   */
        li.onclick = () => {
            setMovieData(item)
        }


        let modal_bg = document.querySelector('.modal_bg')
        let img_modal = document.querySelector('.img')
        let hh = document.querySelector('#hh')
        let relased = document.querySelector('#relased')
        let runtime = document.querySelector('#runtime')
        let genre = document.querySelector('#genre')
        let director = document.querySelector('#director')
        let launguage = document.querySelector('#launguage')
        let country = document.querySelector('#country')
        let close = document.querySelector('.close')
        let name = document.querySelector('#name')
        let one = document.querySelector('#one')
        let two = document.querySelector('#two')
        let stars = document.querySelectorAll('.stars_item')

        modal_bg.append(close)


        close.onclick = () => {
            modal_bg.style.display = 'none '
        }

        edit.onclick = () => {
            hh.innerHTML = `Year: ${item.Year}`
            relased.innerHTML = `Released: ${item.Released}`
            runtime.innerHTML = `Runtime: ${item.Runtime}`
            genre.innerHTML = `Genre: ${item.Genre}`
            director.innerHTML = `Director: ${item.Director}`
            launguage.innerHTML = `Language: ${item.Language}`
            country.innerHTML = `Country: ${item.Country}`
            name.innerHTML = `Source: ${item.Title}`

            img_modal.style.backgroundImage = `url(${item.Poster})`
            modal_bg.style.display = 'block'
            initRatings(item)
        }
    }

}





function setMovieData(item) {
    bac.style.backgroundImage = `url("${item.Poster}")`
    gen.innerHTML = item.Genre
    title.innerHTML = item.Title
    text.innerHTML = item.Plot
    IMBd.innerHTML = `IMDb: ${item.imdbRating}`
    kinopoisk.innerHTML = `Кинопоиск: ${item.Metascore}`
}

let genId = 0
reloadGeners(genres)
function reloadGeners(arr) {
    gen_ul.innerHTML = ''
    for (let item of arr) {
        let gen_li = document.createElement('li')
        let gen_a = document.createElement('a')

        if (arr.indexOf(item) === genId) {
            gen_a.classList.add('promo__menu-item_active')
        }

        gen_a.href = '#'
        gen_a.innerHTML = item

        gen_a.classList.add('promo__menu-item')
        gen_li.classList.add('promo__menu-item')


        gen_li.append(gen_a)
        gen_ul.append(gen_li)


        gen_a.onclick = () => {
            genId = arr.indexOf(item)
            reloadGeners(genres)

            if (item.toLowerCase() == 'all') {
                reload(movies)
                return
            }

            let filtered = movies.filter(el => {
                let genre = el.Genre.toLowerCase()
                if (item.toLowerCase() === genre) {
                    return el
                }
            })
            reload(filtered)
        }
    }
}

const ratings = document.querySelectorAll('.rating')
console.log(ratings);
function initRatings(item) {
    let ratingActive, ratingValue

    for (let index = 0; index < ratings.length; index++) {
        const rating = ratings[index];
        initRating(rating)
    }

    function initRating(rating) {
        initRatingVars(rating)

        setRatingActiveWidth()

        if (rating.classList.contains('rating_set')) {
            setRating(rating)
        }
    }


    function initRatingVars(rating) {
        ratingActive = rating.querySelector('.rating__active')
        ratingValue = rating.querySelector('.rating_value')
        ratingValue.innerHTML = item.Ratings[0].Value.split('/')[0]
    }


    function setRatingActiveWidth(index = ratingValue.innerHTML) {
        const ratingActiveWidth = index / .1
        ratingActive.style.width = `${ratingActiveWidth}%`
    }


    function setRating(rating) {
        const ratingItems = rating.querySelectorAll('.rating__item')

        for (let index = 0; index < ratingItems.length; index++) {
            const ratingItem = ratingItems[index];
            ratingItem.addEventListener('mouseenter',function(e){
                initRatingVars(rating)

                setRatingActiveWidth(ratingItem.value)
            })
            ratingItem.addEventListener('mouseleave',function(e){
                setRatingActiveWidth()
            })
            ratingItem.addEventListener('click',function(e){
                initRatingVars(rating)

                if(rating.dataset.ajax){
                    setRatingValue(ratingItem.value, rating)
                }else{
                    ratingValue.innerHTML=index+1
                    setRatingActiveWidth()
                }
            })
        }
    }
}