
function app_actions() {
    return {
        auth_type: "BASIC",
        auth: {
            username: "",
            password: "",
            bearer: "",
            api_name: "",
            api_token: "",
            add_to: ""
        },
        headerList: [],
        paramList: [],
        action: "GET",
        url: "",
        headers: {"Content-Type": "application/json"},
        feedback_data: "",
        feedback_header: "",
        data_format: "",
        data: {
            json: "",
            xml: "",
        },
        status_text: "",
        status: "",

        add_header() {
            this.headerList.push({name: '', value: ''});
        },

        add_parameter() {
            this.paramList.push({name: '', value: ''});
        },

        submit_request() {
            switch(this.action) {
                case 'GET':
                    this.make_get_request();
                    break;

                case 'POST':
                    this.make_post_request();
                    break;

                case 'PUT':
                    this.make_put_request();
                    break;

                case 'DELETE':
                    this.make_delete_request();
                    break;

                default:
                    break;
            }
        },

        get_data() {
            if(this.data_format == "JSON") {

                //this.headers["Content-Type"] = "text/xml";
                return JSON.parse(JSON.stringify(this.data.json))

            } else if(this.data_format == "XML") {

                //this.headers["Content-Type"] = "application/xml";
                parser = new DOMParser();
                return parser.parseFromString(this.data.xml, "text/xml");
                
            } else if(this.data_format == "FORM-DATA") {

                //this.headers["Content-Type"] = "multipart/form-data";

            } else {

                //this.headers["Content-Type"] = "application/x-www-form-urlencoded";

            }
        },

        get_headers() {
            var h = {};

            if(this.auth_type == "BEARER") {
                h["Authorization"] = "Bearer " + this.auth.bearer
            }

            if(this.auth_type == "API" && this.auth.add_to == "HEADER") {
                h["Authorization"] = this.auth.api_name + " " + this.auth.api_token 
            }

            this.headerList.forEach(el => {
                h[el.name] = el.value;
            })

            return h
        },

        get_params() {
            var p = {};

            if(this.auth_type == "API" && this.auth.add_to == "PARAMS") {
                p[this.auth.api_name] = this.auth.api_token
            }

            this.paramList.forEach(el => {
                p[el.name] = el.value;
            })

            return p
        },

        make_get_request() {
            //auth: { username: this.auth.username, password: this.auth.password },
            axios.get(this.url, { 
                headers: this.get_headers(), 
                params: this.get_params(),
            }).then(res => {

                this.feedback_header = JSON.stringify(res.headers, null, "\t");
                this.feedback_data = JSON.stringify(res.data, null, "\t");
                this.status_text = res.statusText;
                this.status = res.status;

            }).catch(function(err) {
                
                this.feedback_header = JSON.stringify(err.response.headers, null, "\t");
                this.feedback_data = JSON.stringify(err.response.data, null, "\t");
                this.status = err.response.status;
            })
        },

        make_post_request() {
            axios.post(this.url, this.get_data(), { 
                headers: this.get_headers(), 
                params: this.get_params(),
            }).then(res => {

                this.feedback_header = JSON.stringify(res.headers, null, "\t");
                this.feedback_data = JSON.stringify(res.data, null, "\t");
                this.status_text = res.statusText;
                this.status = res.status;

            }).catch(function(err) {
                
                this.feedback_header = JSON.stringify(err.response.headers, null, "\t");
                this.feedback_data = JSON.stringify(err.response.data, null, "\t");
                this.status = err.response.status;
            })
        },

        make_put_request() {
            axios.put(this.url, this.get_data(), { 
                headers: this.get_headers(), 
                params: this.get_params(),
            }).then(res => {

                this.feedback_header = JSON.stringify(res.headers, null, "\t");
                this.feedback_data = JSON.stringify(res.data, null, "\t");
                this.status_text = res.statusText;
                this.status = res.status;

            }).catch(function(err) {
                
                this.feedback_header = JSON.stringify(err.response.headers, null, "\t");
                this.feedback_data = JSON.stringify(err.response.data, null, "\t");
                this.status = err.response.status;
            })
        },

        make_delete_request() {
            axios.delete(this.url, { 
                headers: this.get_headers(), 
                params: this.get_params(),
            }).then(res => {

                this.feedback_header = JSON.stringify(res.headers, null, "\t");
                this.feedback_data = JSON.stringify(res.data, null, "\t");
                this.status_text = res.statusText;
                this.status = res.status;

            }).catch(function(err) {
                
                this.feedback_header = JSON.stringify(err.response.headers, null, "\t");
                this.feedback_data = JSON.stringify(err.response.data, null, "\t");
                this.status = err.response.status;
            })
        },

    }
}