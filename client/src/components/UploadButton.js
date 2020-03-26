import { Button } from "@material-ui/core";

export default function UploadButton(props) {
    return(
        <div style={{ marginTop: "1rem", marginBottom: "2rem" }}>
            <input
                accept="image/png"
                style={{ display: "none"}}
                id="upload-button"
                multiple
                type="file"
                onChange={event => props.setPhoto(event.target.value)}
            />
            <label htmlFor="upload-button">
                <Button variant="outlined" component="span">
                    Upload Photo
                </Button>
            </label>
        </div>
    );
}