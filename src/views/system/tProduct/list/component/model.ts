export interface TProductTableColumns {    
    id:string;  // ID    
    store_id:string;  // ID    
    gtid:string;  //    
    name:string;  //    
    save_name:string;  //    
    price: number;  //    
    image: string|undefined;
    image_path:string;  //    
    image_type:string;  //    
    description:string;  //    
    status:number;  // : 1=, 2=    
    createa_at:string;  //    
}


export interface TProductInfoData {    
    id?:string|undefined;        // ID    
    store_id?:string|undefined; // ID    
    gtid?:string|undefined; //    
    name?:string|undefined; //    
    save_name?:string|undefined; //    
    price?: number | undefined; // 
    image?: string|undefined;
    image_path?:string|undefined; //    
    image_type?:string|undefined; //    
    description?:string|undefined; //    
    status?:number|undefined; // : 1=, 2=    
    createa_at?:string|undefined; //    
    updated_at?:string|undefined; //    
}


export interface TProductTableDataState {
    ids:any[];
    tableData: {
        data: Array<TProductTableColumns>;
        total: number;
        loading: boolean;
        param: {
            pageNum: number;
            pageSize: number;            
            id: string|undefined;            
            store_id: string|undefined;            
            gtid: string|undefined;            
            name: string|undefined;            
            save_name: string|undefined;            
            price: number | undefined;  
            image: string|undefined;
            image_path: string|undefined;            
            image_type: string|undefined;            
            description: string|undefined;            
            status: number|undefined;            
            createa_at: string|undefined;            
        };
    };
}

export interface TProductCreateState {
    loading:boolean; 
    formData: {
        store_id:string|undefined;
        products: TProductInfoData[];
    };
}

export interface TProductEditState{
    loading:boolean;
    isShowDialog: boolean;
    formData:TProductInfoData;
    rules: object;
}