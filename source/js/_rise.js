$(function() {

    $('._myapps ._myapps .application .introduction .background--F2F8FE').addClass('oncross--rose')

    $('._myapps sign incomplete').addClass('oncross--rose')
    
    $('._myapps ._myapps .application .introduction .background--F2F8FE').click(function() {

        $('._myapps nonce').removeClass('pointer-events--none opacity--0').addClass('opacity--6')
        $('._myapps sign').removeClass('pointer-events--none opacity--0')

        $('._myapps sign form[name=authorization] [name=email_address]').focus()

    })

    $('._myapps .background--03A0F3 .conclusion .text-color--007EE7').addClass('oncross--rose')
    
    $('._myapps .background--03A0F3 .conclusion .text-color--007EE7').click(function() {

        $('body').toggleClass('overflow--xhidden overflow--hidden')
        
        $('._myapps nonce').removeClass('pointer-events--none opacity--0').addClass('opacity--6')

        $('._myapps sign').removeClass('pointer-events--none opacity--0')

        $('._myapps sign form[name=authorization] [name=email_address]').focus()

    })
    
    $('._myapps sign incomplete').click(function() {

        $('body').toggleClass('overflow--xhidden overflow--hidden')

        $('._myapps nonce').removeClass('opacity--6').addClass('pointer-events--none opacity--0')

        $('._myapps sign').addClass('pointer-events--none opacity--0')
    })

    $('._myapps ._myapps .application .conclusion .background--007EE7').addClass('oncross--rose')

    $('._myapps ._myapps .application .conclusion .grid-template-columns--4FR .border--EBEBEB').addClass('oncross--rose')
       
    $('._myapps ._myapps .application .conclusion form[name=authorization] input[name=name]').keyup(function() {
        $('._myapps ._myapps .application .conclusion form[name=authorization] input[name=name]').removeClass('border-color--F81000')
    })

    $('._myapps ._myapps .application .conclusion form[name=authorization] input[name=email_address]').keyup(function() {
        $('._myapps ._myapps .application .conclusion form[name=authorization] input[name=email_address]').removeClass('border-color--F81000')
    })

    $('._myapps ._myapps .application .conclusion form[name=authorization] input[name=password]').keyup(function() {
        $('._myapps ._myapps .application .conclusion form[name=authorization] input[name=password]').removeClass('border-color--F81000')
    })

    $('._myapps ._myapps .application .conclusion form[name=authorization]').submit(function(submitted) {

        submitted.preventDefault()

        $.ajax({
            url: '/api/authorization',
            method: 'POST',
            data: {
                name: $('._myapps ._myapps .application .conclusion form[name=authorization] input[name=name]').prop('value'),
                email_address: $('._myapps ._myapps .application .conclusion form[name=authorization] input[name=email_address]').prop('value'),
                password: $('._myapps ._myapps .application .conclusion form[name=authorization] input[name=password]').prop('value')
            },
            success: function(message) {

                switch (message) {

                    case 'Full name is required, try again': {

                        $('._myapps ._myapps .application .conclusion form[name=authorization] [name=name]').attr('placeholder', message).addClass('placeholder-color border-color--F81000')

                            break

                    }
                    case 'Email address is required, try again': {

                        $('._myapps ._myapps .application .conclusion form[name=authorization] [name=email_address]').attr('placeholder', message).addClass('placeholder-color border-color--F81000')

                            break

                    }
                    case 'Email address has already been used, try again': {

                        $('._myapps ._myapps .application .conclusion form[name=authorization] [name=email_address]').attr('placeholder', message).addClass('placeholder-color border-color--F81000')

                            break

                    }
                    case 'Password is required, try again': {

                        $('._myapps ._myapps .application .conclusion form[name=authorization] [name=password]').attr('placeholder', message).addClass('placeholder-color border-color--F81000')

                            break

                    }
                    default: {

                        $(location).attr('href', message.location)

                            break

                    }
                }
            }
        })
    })
    
    $('._myapps ._myapps .application .conclusion form[name=sign-in] input[name=email_address]').keyup(function() {
        $('._myapps ._myapps .application .conclusion form[name=sign-in] input[name=email_address]').removeClass('border-color--F81000')
    })

    $('._myapps ._myapps .application .conclusion form[name=sign-in] input[name=password]').keyup(function() {
        $('._myapps ._myapps .application .conclusion form[name=sign-in] input[name=password]').removeClass('border-color--F81000')
    })
     
    $('._myapps sign form[name=sign-in]').submit(function(submitted) {

        submitted.preventDefault()

        $.ajax({
            url: '/api/sign-in',
            method: 'POST',
            data: {
                email_address: $('._myapps sign form[name=sign-in] input[name=email_address]').prop('value'),
                password: $('._myapps sign form[name=sign-in] input[name=password]').prop('value')
            },
            success: function(message) {

                switch (message) {

                    case 'Email address is required, try again': {

                        $('._myapps sign form[name=sign-in] [name=email_address]').attr('placeholder', message).addClass('placeholder-color border-color--F81000')

                            break

                    }
                    case 'Password is required, try again': {

                        $('._myapps sign form[name=sign-in] [name=password]').attr('placeholder', message).addClass('placeholder-color border-color--F81000')

                            break

                    }
                    case 'Failed to sign in, try again': {

                        $('._myapps sign form[name=sign-in] [name=password]').attr('placeholder', message).addClass('placeholder-color border-color--F81000')

                            break

                    }
                    default: {

                        $(location).attr('href', message.location)

                    }
                }
            }
        })
    })

    $('._myapps ._challenges open-challenge').addClass('oncross--rose')

    $('._myapps form[name=do-challenge] input[name=picture]').change(function() {

        var data = new FormData($('._myapps form[name=do-challenge]')[0]);

        $.ajax({
            url: '/api/upload',
            method: 'POST',
            cache: false,
            contentType: false,
            processData: false,
            data: data,
            success: function(address) {

                $('._myapps form[name=do-challenge] [for="picture"]').css('pointer-events', 'none')

                $('._myapps form[name=do-challenge] [for="picture"]').css('opacity', '.4')

                $('._myapps form[name=do-challenge] input[name=just_picture]').val(address)

            }
        })
    })

    $('._myapps form[name=do-challenge]').submit(function(submitted) {

        submitted.preventDefault()

        $.ajax({
            url: '/api/do-challenge',
            method: 'POST',
            data: {
                _id: $('._myapps form[name=do-challenge] [name=_id]').prop('value'),
                just_picture: $('._myapps form[name=do-challenge] [name=just_picture]').prop('value')
            },
            success: function(message) {

                switch (message) {
                    
                    case 'Challenge has been sent for review': {

                        $(location).attr('href', '/challenges')

                            break

                    }
                    case 'Challenge has not been sent for review': {

                        alert('Challenge has not been sent for review')

                            break

                    }
                    case "You're not logged in": {

                        alert("You're not logged in")

                            break

                    }
                }
            }
        })
    })

    $('._myapps challenge incomplete').addClass('oncross--rose')

    $(document).on('click', '._myapps ._challenges open-challenge', function() {

        const challange = $(this).data('challange')

        const picture = $(this).data('picture')

        const _id = $(this).data('_id')

        $('body').toggleClass('overflow--xhidden overflow--hidden')

        $('[name="_id"]').val(_id)

        $('._myapps nonce').removeClass('pointer-events--none opacity--0').addClass('opacity--6')

        $('._myapps challenge .text-size--22').text(challange)

        $('._myapps challenge .introduction .border-top-right--0').attr('src', picture)

        $('._myapps challenge').removeClass('pointer-events--none opacity--0')

        $('._myapps challenge form[name=authorization] [name=email_address]').focus()

    })

    $('._myapps challenge incomplete').click(function() {

        $('body').toggleClass('overflow--xhidden overflow--hidden')

        $('._myapps nonce').removeClass('opacity--6').addClass('pointer-events--none opacity--0')

        $('._myapps challenge').addClass('pointer-events--none opacity--0')

    })

    $('._myapps [data-create]').addClass('oncross--rose')

    $('._myapps create-challenge incomplete').addClass('oncross--rose')

    $('._myapps [data-create]').click(function() {

        $('body').toggleClass('overflow--xhidden overflow--hidden')

        $('._myapps nonce').removeClass('pointer-events--none opacity--0').addClass('opacity--6')

        $('._myapps create-challenge').removeClass('pointer-events--none opacity--0')

        $('._myapps create-challenge form[name=authorization] [name=email_address]').focus()

    })
    
    $('._myapps form[name=upload-material] input[name=picture]').change(function() {

        var data = new FormData($('._myapps form[name=upload-material]')[0]);

        $.ajax({
            url: '/api/upload',
            method: 'POST',
            cache: false,
            contentType: false,
            processData: false,
            data: data,
            success: function(address) {

                $('._myapps form[name=upload-material] [for="picture"]').css('pointer-events', 'none')

                $('._myapps form[name=upload-material] [for="picture"]').css('opacity', '.4')

                $('._myapps form[name=upload-material] input[name=just_picture]').val(address)

            }
        })
    })

    $('._myapps form[name=upload-material]').submit(function(submitted) {

        submitted.preventDefault()

        $.ajax({
            url: '/api/upload-material',
            method: 'POST',
            data: {
                picture: $('._myapps form[name=upload-material] input[name=just_picture]').prop('value'),
                name: $('._myapps form[name=upload-material] input[name=name]').prop('value'),
                describe: $('._myapps form[name=upload-material] [name=describe]').prop('value'),
                cash: $('._myapps form[name=upload-material] input[name=cash]').prop('value'),
                step1: $('._myapps form[name=upload-material] input[name=step1]').prop('value'),
                step2: $('._myapps form[name=upload-material] input[name=step2]').prop('value'),
                step3: $('._myapps form[name=upload-material] input[name=step3]').prop('value')
            },
            success: function(message) {

                switch (message) {
                    
                    case 'Challenge has been created': {

                        $(location).attr('href', '/challenges')

                            break

                    }
                    case 'Challenge has not been created': {

                        alert('Challenge has not been created')

                            break

                    }
                    case "You're not logged in": {

                        alert("You're not logged in")

                            break

                    }
                }
            }
        })
    })

    $('._myapps create-challenge incomplete').click(function() {

        $('body').toggleClass('overflow--xhidden overflow--hidden')

        $('._myapps nonce').removeClass('opacity--6').addClass('pointer-events--none opacity--0')

        $('._myapps create-challenge').addClass('pointer-events--none opacity--0')

    })

    $('._myapps [data-sort]').addClass('oncross--rose')

    $('._myapps [data-sort]').addClass('transition--200ms')
       
    $('._myapps [data-sort]').click(function() {

        const sort = $(this).data('sort')

        const referer = $(this).data('referer')

        $('._myapps [data-sort]').removeClass('opacity--10').addClass('opacity--4')

        $(this).addClass('opacity--10')

        $.ajax({
            url: '/api/sort',
            method: 'POST',
            data: {
                referer: referer,
                sort: sort
            },
            success: function(message) {

                if (message.referer == 'continue-as-guest') {

                    if (sort == 'completed') {

                        $('._myapps .challenges .conclusion .grid-template-columns--1FR').empty()
                        
                        $.each(message.challenges, function(_, value) {
    
                            const card = `
                                <div>
                                    <div class="posture--relative padding-top--20 padding-right--40 padding-bottom--20 padding-left--20 border--EBEBEB border-radius--10">
                                        <div>
                                            <div class="view--grid grid-template-columns--25REM grid-gap--4rem align--center">
                                                <div>
                                                    <div class="posture--relative">
                                                        <div>
                                                            <img class="object--cover border-radius--10" width="100%" height="180" src="` + value.picture + `" alt="Community - ` + value.name + `">
                                                        </div>
                                                        <div>
                                                            <div class="posture--absolute top--0 right--0 bottom--0 left--0 padding-top--40 padding-right--40 padding-bottom--40 padding-bottom--40 padding-left--40 background--00000063 border-radius--10">
                                                                <div>
                                                                    <div class="text-size--20 text-color--FFFFFF text-line-height--165 text-align--center">` + value.name + `</div>
                                                                </div>
                                                                <div class="margin-top--5">
                                                                    <div>
                                                                        <div class="opacity--8">
                                                                            <div>
                                                                                <div class="text-color--FFFFFF text-line-height--165 text-align--center">` + value.describe + `</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="text-align--center text-line-height--165">Complete the task for the amount <color--FFF style="color:#007EE7">$` + value.cash + `</color--FFF></div>
                                                </div>
                                                <div>
                                                    <div>
                                                        <div class="view--grid grid-template-columns--2XY grid-gap---85rem align--center justify--start">
                                                            <div>
                                                                <div class="min-width--25 min-height--25 border--EBEBEB border-radius--50 view--grid align--center justify--center">
                                                                    <div>
                                                                        <div class="opacity--4">
                                                                            <div>
                                                                                <div class="text-size--12">1</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div class="margin-top---2">
                                                                    <div>
                                                                        <div class="opacity--6">
                                                                            <div>
                                                                                <div class="text-size--14 text-weight--500 text-line-height--165">` + value.step1 + `</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="margin-top--10">
                                                        <div>
                                                            <div class="view--grid grid-template-columns--2XY grid-gap---85rem align--center justify--start">
                                                                <div>
                                                                    <div class="min-width--25 min-height--25 border--EBEBEB border-radius--50 view--grid align--center justify--center">
                                                                        <div>
                                                                            <div class="opacity--4">
                                                                                <div>
                                                                                    <div class="text-size--12">2</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div class="margin-top---2">
                                                                        <div>
                                                                            <div class="opacity--6">
                                                                                <div>
                                                                                    <div class="text-size--14 text-weight--500 text-line-height--165">` + value.step2 + `</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="margin-top--10">
                                                        <div>
                                                            <div class="view--grid grid-template-columns--2XY grid-gap---85rem align--center justify--start">
                                                                <div>
                                                                    <div class="min-width--25 min-height--25 border--EBEBEB border-radius--50 view--grid align--center justify--center">
                                                                        <div>
                                                                            <div class="opacity--4">
                                                                                <div>
                                                                                    <div class="text-size--12">3</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div class="margin-top---2">
                                                                        <div>
                                                                            <div class="opacity--6">
                                                                                <div>
                                                                                    <div class="text-size--14 text-weight--500 text-line-height--165">` + value.step3 + `</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="margin-top--20 view--grid justify--start">
                                                        <div>
                                                            <div class="text-size--14 text-weight--500 view--grid grid-template-columns--2XY grid-gap---35rem align--center background--F2F8FE text-color--FFFFFF text-align--center padding-top--10 padding-right--20 padding-bottom--10 padding-left--20 border-radius--50 oncross--rose" style="color:#007EE7" data-watch="` + value.watch + `">Watch <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#007EE7" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `
    
                            $('._myapps .challenges .conclusion .grid-template-columns--1FR').append(card)
        
                        })
    
                    } else {
    
                        $('._myapps .challenges .conclusion .grid-template-columns--1FR').empty()
    
                        $.each(message.challenges, function(_, value) {
                            
                            const card = `
                                <div>
                                    <div class="posture--relative padding-top--20 padding-right--40 padding-bottom--20 padding-left--20 border--EBEBEB border-radius--10">
                                        <div>
                                            <div class="view--grid grid-template-columns--25REM grid-gap--4rem align--center">
                                                <div>
                                                    <div class="posture--relative">
                                                        <div>
                                                            <img class="object--cover border-radius--10" width="100%" height="180" src="` + value.picture + `" alt="Community - ` + value.name + `">
                                                        </div>
                                                        <div>
                                                            <div class="posture--absolute top--0 right--0 bottom--0 left--0 padding-top--40 padding-right--40 padding-bottom--40 padding-bottom--40 padding-left--40 background--00000063 border-radius--10">
                                                                <div>
                                                                    <div class="text-size--20 text-color--FFFFFF text-line-height--165 text-align--center">` + value.name + `</div>
                                                                </div>
                                                                <div class="margin-top--5">
                                                                    <div>
                                                                        <div class="opacity--8">
                                                                            <div>
                                                                                <div class="text-color--FFFFFF text-line-height--165 text-align--center">` + value.describe + `</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="text-align--center text-line-height--165">Complete the task for the amount <color--FFF style="color:#007EE7">$` + value.cash + `</color--FFF></div>
                                                </div>
                                                <div>
                                                    <div>
                                                        <div class="view--grid grid-template-columns--2XY grid-gap---85rem align--center justify--start">
                                                            <div>
                                                                <div class="min-width--25 min-height--25 border--EBEBEB border-radius--50 view--grid align--center justify--center">
                                                                    <div>
                                                                        <div class="opacity--4">
                                                                            <div>
                                                                                <div class="text-size--12">1</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div class="margin-top---2">
                                                                    <div>
                                                                        <div class="opacity--6">
                                                                            <div>
                                                                                <div class="text-size--14 text-weight--500 text-line-height--165">` + value.step1 + `</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="margin-top--10">
                                                        <div>
                                                            <div class="view--grid grid-template-columns--2XY grid-gap---85rem align--center justify--start">
                                                                <div>
                                                                    <div class="min-width--25 min-height--25 border--EBEBEB border-radius--50 view--grid align--center justify--center">
                                                                        <div>
                                                                            <div class="opacity--4">
                                                                                <div>
                                                                                    <div class="text-size--12">2</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div class="margin-top---2">
                                                                        <div>
                                                                            <div class="opacity--6">
                                                                                <div>
                                                                                    <div class="text-size--14 text-weight--500 text-line-height--165">` + value.step2 + `</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="margin-top--10">
                                                        <div>
                                                            <div class="view--grid grid-template-columns--2XY grid-gap---85rem align--center justify--start">
                                                                <div>
                                                                    <div class="min-width--25 min-height--25 border--EBEBEB border-radius--50 view--grid align--center justify--center">
                                                                        <div>
                                                                            <div class="opacity--4">
                                                                                <div>
                                                                                    <div class="text-size--12">3</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div class="margin-top---2">
                                                                        <div>
                                                                            <div class="opacity--6">
                                                                                <div>
                                                                                    <div class="text-size--14 text-weight--500 text-line-height--165">` + value.step3 + `</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="margin-top--20 view--grid justify--start">
                                                        <div>
                                                            <a class="text-size--14 text-weight--500 view--grid grid-template-columns--2XY grid-gap---35rem align--center background--F2F8FE text-color--FFFFFF text-align--center padding-top--10 padding-right--20 padding-bottom--10 padding-left--20 border-radius--50 oncross--rose" data-challange="The best supercars cars" data-picture="//carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1666008987698.jpg" style="color:#007EE7" href="/">You must be logged in <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#007EE7" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `
    
                            $('._myapps .challenges .conclusion .grid-template-columns--1FR').append(card)
        
                        })
                    }
                }

                if (message.referer == 'challenges') {

                    if (sort == 'completed') {

                        $('._myapps .challenges .conclusion .grid-template-columns--1FR').empty()
    
                        $.each(message.challenges, function(_, value) {
    
                            const card = `
                                <div>
                                    <div class="posture--relative padding-top--20 padding-right--40 padding-bottom--20 padding-left--20 border--EBEBEB border-radius--10">
                                        <div>
                                            <div class="view--grid grid-template-columns--25REM grid-gap--4rem align--center">
                                                <div>
                                                    <div class="posture--relative">
                                                        <div>
                                                            <img class="object--cover border-radius--10" width="100%" height="180" src="` + value.picture + `" alt="Community - ` + value.name + `">
                                                        </div>
                                                        <div>
                                                            <div class="posture--absolute top--0 right--0 bottom--0 left--0 padding-top--40 padding-right--40 padding-bottom--40 padding-bottom--40 padding-left--40 background--00000063 border-radius--10">
                                                                <div>
                                                                    <div class="text-size--20 text-color--FFFFFF text-line-height--165 text-align--center">` + value.name + `</div>
                                                                </div>
                                                                <div class="margin-top--5">
                                                                    <div>
                                                                        <div class="opacity--8">
                                                                            <div>
                                                                                <div class="text-color--FFFFFF text-line-height--165 text-align--center">` + value.describe + `</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="text-align--center text-line-height--165">Complete the task for the amount <color--FFF style="color:#007EE7">$` + value.cash + `</color--FFF></div>
                                                </div>
                                                <div>
                                                    <div>
                                                        <div class="view--grid grid-template-columns--2XY grid-gap---85rem align--center justify--start">
                                                            <div>
                                                                <div class="min-width--25 min-height--25 border--EBEBEB border-radius--50 view--grid align--center justify--center">
                                                                    <div>
                                                                        <div class="opacity--4">
                                                                            <div>
                                                                                <div class="text-size--12">1</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div class="margin-top---2">
                                                                    <div>
                                                                        <div class="opacity--6">
                                                                            <div>
                                                                                <div class="text-size--14 text-weight--500 text-line-height--165">` + value.step1 + `</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="margin-top--10">
                                                        <div>
                                                            <div class="view--grid grid-template-columns--2XY grid-gap---85rem align--center justify--start">
                                                                <div>
                                                                    <div class="min-width--25 min-height--25 border--EBEBEB border-radius--50 view--grid align--center justify--center">
                                                                        <div>
                                                                            <div class="opacity--4">
                                                                                <div>
                                                                                    <div class="text-size--12">2</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div class="margin-top---2">
                                                                        <div>
                                                                            <div class="opacity--6">
                                                                                <div>
                                                                                    <div class="text-size--14 text-weight--500 text-line-height--165">` + value.step2 + `</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="margin-top--10">
                                                        <div>
                                                            <div class="view--grid grid-template-columns--2XY grid-gap---85rem align--center justify--start">
                                                                <div>
                                                                    <div class="min-width--25 min-height--25 border--EBEBEB border-radius--50 view--grid align--center justify--center">
                                                                        <div>
                                                                            <div class="opacity--4">
                                                                                <div>
                                                                                    <div class="text-size--12">3</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div class="margin-top---2">
                                                                        <div>
                                                                            <div class="opacity--6">
                                                                                <div>
                                                                                    <div class="text-size--14 text-weight--500 text-line-height--165">` + value.step3 + `</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="margin-top--20 view--grid justify--start">
                                                        <div>
                                                            <div class="text-size--14 text-weight--500 view--grid grid-template-columns--2XY grid-gap---35rem align--center background--F2F8FE text-color--FFFFFF text-align--center padding-top--10 padding-right--20 padding-bottom--10 padding-left--20 border-radius--50 oncross--rose" style="color:#007EE7" data-watch="` + value.watch + `">Watch <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#007EE7" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `
    
                            $('._myapps .challenges .conclusion .grid-template-columns--1FR').append(card)
        
                        })
    
                    } else {
    
                        $('._myapps .challenges .conclusion .grid-template-columns--1FR').empty()
                        
                        $.each(message.challenges, function(_, value) {
    
                            const card = `
                                <div>
                                    <div class="posture--relative padding-top--20 padding-right--40 padding-bottom--20 padding-left--20 border--EBEBEB border-radius--10">
                                        <div>
                                            <div class="view--grid grid-template-columns--25REM grid-gap--4rem align--center">
                                                <div>
                                                    <div class="posture--relative">
                                                        <div>
                                                            <img class="object--cover border-radius--10" width="100%" height="180" src="` + value.picture + `" alt="Community - ` + value.name + `">
                                                        </div>
                                                        <div>
                                                            <div class="posture--absolute top--0 right--0 bottom--0 left--0 padding-top--40 padding-right--40 padding-bottom--40 padding-bottom--40 padding-left--40 background--00000063 border-radius--10">
                                                                <div>
                                                                    <div class="text-size--20 text-color--FFFFFF text-line-height--165 text-align--center">` + value.name + `</div>
                                                                </div>
                                                                <div class="margin-top--5">
                                                                    <div>
                                                                        <div class="opacity--8">
                                                                            <div>
                                                                                <div class="text-color--FFFFFF text-line-height--165 text-align--center">` + value.describe + `</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="text-align--center text-line-height--165">Complete the task for the amount <color--FFF style="color:#007EE7">$` + value.cash + `</color--FFF></div>
                                                </div>
                                                <div>
                                                    <div>
                                                        <div class="view--grid grid-template-columns--2XY grid-gap---85rem align--center justify--start">
                                                            <div>
                                                                <div class="min-width--25 min-height--25 border--EBEBEB border-radius--50 view--grid align--center justify--center">
                                                                    <div>
                                                                        <div class="opacity--4">
                                                                            <div>
                                                                                <div class="text-size--12">1</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div class="margin-top---2">
                                                                    <div>
                                                                        <div class="opacity--6">
                                                                            <div>
                                                                                <div class="text-size--14 text-weight--500 text-line-height--165">` + value.step1 + `</div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="margin-top--10">
                                                        <div>
                                                            <div class="view--grid grid-template-columns--2XY grid-gap---85rem align--center justify--start">
                                                                <div>
                                                                    <div class="min-width--25 min-height--25 border--EBEBEB border-radius--50 view--grid align--center justify--center">
                                                                        <div>
                                                                            <div class="opacity--4">
                                                                                <div>
                                                                                    <div class="text-size--12">2</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div class="margin-top---2">
                                                                        <div>
                                                                            <div class="opacity--6">
                                                                                <div>
                                                                                    <div class="text-size--14 text-weight--500 text-line-height--165">` + value.step2 + `</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="margin-top--10">
                                                        <div>
                                                            <div class="view--grid grid-template-columns--2XY grid-gap---85rem align--center justify--start">
                                                                <div>
                                                                    <div class="min-width--25 min-height--25 border--EBEBEB border-radius--50 view--grid align--center justify--center">
                                                                        <div>
                                                                            <div class="opacity--4">
                                                                                <div>
                                                                                    <div class="text-size--12">3</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div class="margin-top---2">
                                                                        <div>
                                                                            <div class="opacity--6">
                                                                                <div>
                                                                                    <div class="text-size--14 text-weight--500 text-line-height--165">` + value.step3 + `</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="margin-top--20 view--grid justify--start">
                                                        <div>
                                                            <open-challenge class="text-size--14 text-weight--500 view--grid grid-template-columns--2XY grid-gap---35rem align--center background--F2F8FE text-color--FFFFFF text-align--center padding-top--10 padding-right--20 padding-bottom--10 padding-left--20 border-radius--50 oncross--rose" data-challange="The best supercars cars" data-picture="` + value.picture + `" style="color:#007EE7">Join <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#007EE7" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></open-challenge>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `
    
                            $('._myapps .challenges .conclusion .grid-template-columns--1FR').append(card)
        
                        })
                    }
                }
            }
        })
    })

    $(document).on('click', '._myapps [data-watch]', function() {

        const watch = $(this).data('watch')

        $('body').toggleClass('overflow--xhidden overflow--hidden')

        $('._myapps watch-execution .introduction video').attr('src', watch)

        $('._myapps nonce').removeClass('pointer-events--none opacity--0').addClass('opacity--6')

        $('._myapps watch-execution').removeClass('pointer-events--none opacity--0')

        $('._myapps watch-execution .introduction video')[0].load();

    })

    $('._myapps watch-execution incomplete').addClass('oncross--rose')

    $('._myapps watch-execution incomplete').click(function() {

        $('body').toggleClass('overflow--xhidden overflow--hidden')

        $('._myapps nonce').removeClass('opacity--6').addClass('pointer-events--none opacity--0')

        $('._myapps watch-execution').addClass('pointer-events--none opacity--0')

    })
})