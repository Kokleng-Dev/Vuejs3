Vue.createApp({
    data() {
        return {

            newList: {},
            oldList: [],
            showOldList: [],
            listCard: 20,
            oldPage: true,

            totalPages: 0,
            picture: new Array("assets/img/1.jpg" , "assets/img/2.jpg" , "assets/img/3.jpg" , "assets/img/4.jpg" , "assets/img/5.jpg", 
                               "assets/img/6.jpg" , "assets/img/7.jpg" , "assets/img/8.jpg" , "assets/img/9.jpg" , "assets/img/10.jpg",
                               "assets/img/11.jpg", "assets/img/12.jpg", "assets/img/13.jpg", "assets/img/14.jpg", "assets/img/15.jpg",
                               "assets/img/16.jpg", "assets/img/17.jpg", "assets/img/18.jpg", "assets/img/19.jpg", "assets/img/20.jpg"),
            num: 1,
            numSearch: '',

        }
    },
    methods: {
        img() {
            const IMG = [];
            for (let i = 0; i < this.picture.length; i++) {
                let pic = Math.floor(Math.random() * this.picture.length);
                IMG[i] = this.picture[pic];
            }
            return IMG;
        },
        async getUser(e) {
            const API = `https://api.instantwebtools.net/v1/passenger?page=${e-1}&size=${this.listCard}`;
            await axios
                .get(API)
                .then((response) => {
                    /**
                    * handle success
                    */
                    this.img();
                    let temp = {
                        "page": e
                        , "info": response.data.data
                        , "img": this.img()
                    };

                    this.newList = temp;
                    this.oldList.push(temp);

                    /**
                    * totalPages = totalPages + 1 because it start from index 0
                    */
                    this.totalPages = response.data.totalPages + 1;
                })
                .catch(function (error) {
                    /**
                    * handle error
                    */
                    console.log(error);
                });
        },
        checkOldPage() {
            let condition = true;
            for (let i = 0; i < this.oldList.length; i++) {
                if (this.num == this.oldList[i].page) {
                    this.showOldList = this.oldList[i];
                    condition = false;
                }
            }

            if (condition == true) {
                this.oldPage = true;
            }
            else{
                this.oldPage = false;
            }
        },

        /**
        * start first page 
        */
        currentPage() {
            this.getUser(this.num);
        },

        /**
         * page button
         */
        page(e) {
            this.num = e;
            this.numSearch = '';
            this.checkOldPage();
            if (this.oldPage == true) {
                this.getUser(e);
            }
        },


        /**
         * button for search page
         */
        search() {
            this.num = this.numSearch;
            this.checkOldPage();
            if (this.oldPage == true) {
                this.getUser(this.num);
            }
        },


        /**
         * button (>) next page
         */
        nextPage() {
            let page = this.num + 1;
            if (page > this.totalPages) {
                page = this.totalPages;
            }

            this.num = page;
            this.numSearch = '';
            this.checkOldPage();

            if (this.oldPage == true) {
                this.getUser(page);
            }
        },


        /**
         * button (>) prev page
         */
        prevPage() {
            let page = this.num - 1;
            if (page < 0) {
                page = 0;
            }

            this.num = page;
            this.numSearch = '';
            this.checkOldPage();

            if (this.oldPage == true) {
                this.getUser(page);
            }
        }

    },
    /**
     * display currentpage
     */
    mounted() {
        this.currentPage();
    },
}).mount('#center');









