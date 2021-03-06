
import {FileMetadata} from  "./file-metadata"
import {DataSource} from "../../../api/models/datasource";
import {SchemaParser} from "../../../../model/field-policy";
import {PreviewDataSetRequest} from "./preview-data-set-request"
import {TableViewModel, TableColumn} from "./table-view-model";


/**
 * Core Dataset used for previewing
 * There are other concrete types of data sets used for specialize options
 */
export class PreviewDataSet {

    /**
     * items in the dataset
     */
    public items:any[];

    /**
     * datasource attached to this data set
     */
    public dataSource:DataSource;

    /**
     * Error message
     */
    public message:string;
    /**
     * the preview of the data
     */
    public preview?:TableViewModel;
    /**
     * the Raw dataset preview, if available
     */
    public raw?:TableViewModel;

    /**
     * flag to determine if raw view is even allowed
     */
    public allowsRawView:boolean;
    /**
     * user friendly display name of the key
     */
    public displayKey:string;
    /**
     * internal key representing this set
     */
    public key:string;
    /**
     * is the data loading
     */
    public loading:boolean;
    /**
     * The schema
     */
    public  schema:TableColumn[];

    /**
     * Descriptor of this type of dataset
     */
    public type:string = 'PreviewDataSet';


    /**
     * Apply options to the preview request for this dataset
     * @param {PreviewDataSetRequest} previewRequest
     */
    public applyPreviewRequestProperties(previewRequest: PreviewDataSetRequest){
        previewRequest.previewItem = this.getPreviewItemPath()
        previewRequest.properties = {}
    }



    public constructor(init?:Partial<PreviewDataSet>) {
        Object.assign(this, init);
    }

    public hasPreview():boolean {
        return this.preview != undefined && this.preview.hasColumns();
    }

    public hasRaw() :boolean {
        return this.raw != undefined && this.raw.hasColumns();
    }
    public hasPreviewError():boolean {
        return this.hasPreview() && this.preview.error;
    }
    public hasRawError():boolean {
        return this.hasRaw() && this.raw.error;
    }
    public clearRawError(){
        if(this.raw){
            this.raw.clearError();
        }
    }
    public finishedLoading(){
        this.loading = false;
    }

    public clearPreviewError(){
        if(this.preview){
            this.preview.clearError();
        }
    }

    public rawError(message:string){
        if(!this.raw){
            this.raw = new TableViewModel({error:true,errorMessage:message})
        }
        else {
            this.raw.updateError(this.message)
        }
    }

    public previewError(message:string){
        if(!this.preview){
            this.preview = new TableViewModel({error:true,errorMessage:message})
        }
        else {
            this.preview.updateError(message)
        }
    }

    public isType(type:string){
        return this.type.toLowerCase() == type.toLowerCase();
    }

    public  getPreviewItemPath() :string{
        return this.items != undefined && this.items.length >0 ? this.items[0] : "";
    }

}



