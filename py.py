from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home_page():

    # OUTPUT : menampilkan file HTML
    return render_template("home.html")


# Kondisi agar aplikasi hanya berjalan jika file ini di jalankan langsung
if __name__ == "__main__":
# Menjalankan Server Flask
    app.run(debug=True)