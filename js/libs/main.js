'use strict'

const API_KEY = '29bb47b7552ec502eb87cebfbc77f766';
const API_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';

$(document).ready(function () {

    //events
    $('.search__btn').click(() => {
        getMovie()
    })

    $('.search__field').keypress((e) => {
        if (e.keyCode === 13)
            getMovie()
    })
    //functions
    async function getMovie() {
        let query = $('.search__field').val()

        $('body').addClass('loading')

        if (query !== '') {
            $('.movie').remove()

            let url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`;
            try {
                let response = await fetch(url)
                let res = await response.json()
                console.log(res)
                if (res.results.length === 0) {
                    alert('No movies found')
                } else {
                    res.results.forEach((movie) => {
                        if (movie.poster_path !== null)
                            $('.movies').append(drawMovie(movie))
                        let $movieInfo = $('.movies').find(`#${movie.id}`)
                        $movieInfo.click(() => getReviews(movie.id))
                    })
                }
                $('body').removeClass('loading')
            } catch (err) {
                alert('error!')
            }
        }
    }



    //   fetch(url)
    //     .then(data => data.json()
    //         .then(res => {
    //             if (res.results.length === 0) {
    //                 alert('No movies found')
    //               } else {
    //                 res.results.forEach((movie) => {
    //                   if (movie.poster_path !== null)
    //                     $('.movies').append(drawMovie(movie))
    //                     $('.movies').find('.movie').click(()=>getReviews(movie.id))
    //                 })
    //               }
    //               $('body').removeClass('loading')
    //         }))

    //     }

    //   $.ajax({
    //     url: `${API_URL}/search/movie`,
    //     type: 'GET',
    //     dataType: 'json',
    //     data: {
    //       api_key: API_KEY,
    //       query: query
    //     }
    //   }).then((res) => {

    //   }).catch((e) => console.log(e))
    // }

    // }

    function drawMovie(movie) {
        let movieDom = `<div class="movie" id="${movie.id}">
                                <img class="movie__roll" src="images/roll.png">
                                <img class="movie__poster"src="${IMG_URL + movie.poster_path}" alt="">
                                <h2 class="movie__title">${movie.title}</h2>
                                <div class="movie__info">
                                    <h2>${movie.title}</h2>
                                    <h3><b>Release date: </b>${movie.release_date}</h3>
                                    <h3><b>Rating: </b>${movie.vote_average}</h3>
                                    <p>${movie.overview}</p>
                                </div>
                            </div>`
        return movieDom
    }



    async function getReviews(id) {
        console.log(id);
    
        let url = `${API_URL}/movie/${id}/reviews?api_key=${API_KEY}`;
        try {
          let response = await fetch(url)
          let res = await response.json()
    
          drawReview(res.results)
        //   console.log(res.results)
        } catch (e) {
          alert('errogjgyr!');
        }
    
        // $.ajax({
        //     url: `${API_URL}/movie/${id}/reviews`,
        //     type: 'GET',
        //     dataType: 'json',
        //     data: {
        //         api_key: API_KEY
        //     }
        // })
    }

    function drawReview(results) {
        $('.window').addClass('hide')
        if (results.length !== 0) {
            let reviewDom = `<button class="reviews__close">&times;</button>
                            <h2 class="reviews__author">${results[0].author}</h2>
                            <p class="reviews__content">${results[0].content}</p>`
        $('.reviews').append(reviewDom)
        } else {
            $('.reviews').append(`<button class="reviews__close">&times;</button>
            <h2 class="reviews__no">No reviews</h2>`)
          }

        $(".reviews__close").click(() => {
            removeReview();
        })
    }

    function removeReview() {
        $(".window").removeClass("hide")
        $(".reviews").text(``)        
    }
})