import {SchemaParser} from "../../../../model/field-policy";
import {FileMetadata} from "./file-metadata";
import {PreviewDataSet} from "./preview-data-set";
import {PreviewDataSetRequest} from "./preview-data-set-request";


export interface SparkScript{
    fileLocation:string;
    script:string
}


/**
 * File based dataset (i.e. for local file, S3, hadoop etc)
 */
export class PreviewFileDataSet extends PreviewDataSet{
    public files:FileMetadata[]
    public mimeType:string;
    public sparkScript?:SparkScript;
    public schemaParser:SchemaParser;

    public constructor(init?:Partial<PreviewFileDataSet>) {
        super(init);
        Object.assign(this, init);
        this.type = "FileDataSet"
        this.items = this.files;
        this.allowsRawView = true;
        this.displayKey = this.key.substring(this.key.lastIndexOf("/"));
    }

    hasSparkScript():boolean {
        return this.sparkScript != undefined && this.sparkScript.script != undefined
    }

    public  getPreviewItemPath() :string{
        if(this.files && this.files.length >0){
            return this.files[0].filePath;
        }
    }

    public applyPreviewRequestProperties(previewRequest: PreviewDataSetRequest){
        super.applyPreviewRequestProperties(previewRequest);
        previewRequest.schemaParser = this.schemaParser
        previewRequest.properties = {};
        previewRequest.properties.path = previewRequest.previewItem;
    }

}