class Message extends React.Component {
    render() {
        return (
            <div style={{"margin-left": "100px", "margin-right": "100px", "margin-top": "50px"}}>
                <div style={{"height": "400px"}}>
                    <div style={{
                        "margin-top": "15px", "margin-left": "65px", "height": "350px", "width": "220px",
                        "textAlign": "center", "float": "left", "backgroundColor": "#88B972",
                        "fontFamily": "sans-serif", "color": "black", "border-radius": "20px"
                    }}>
                        <br/><br/><br/>
                        <h3>Phone:
                            <br/>6940314851</h3>
                    </div>
                    <div style={{
                        "margin-top": "15px", "margin-left": "65px", "height": "350px", "width": "220px",
                        "textAlign": "center", "float": "left", "backgroundColor": "#2B4520",
                        "fontFamily": "sans-serif", "color": "white", "border-radius": "20px"
                    }}>
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                        <h4>Email:
                            <br/>goofy@goofy.com</h4>
                    </div>
                    <div style={{
                        "margin-top": "15px", "margin-left": "65px", "height": "350px", "width": "220px",
                        "textAlign": "center", "float": "left", "backgroundColor": "#88B972",
                        "fontFamily": "sans-serif", "color": "black", "border-radius": "20px"
                    }}>
                        <br/><br/><br/>
                        <h3>Phone:
                            <br/>6450314821</h3>
                    </div>
                    <div style={{
                        "margin-top": "15px", "margin-left": "65px", "height": "350px", "width": "220px",
                        "textAlign": "center", "float": "left", "backgroundColor": "#2B4520",
                        "fontFamily": "sans-serif", "color": "white", "border-radius": "20px"
                    }}>
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                        <h4>Email:
                            <br/>goofy.2019@goofy.com</h4>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Message/>,
    document.getElementById('contact')
);
