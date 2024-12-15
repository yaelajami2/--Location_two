import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { LocationService } from '../../service/location.service';
import { Location } from '../../Models/location';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';
import { AlertComponent } from '../alert/alert.component';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ShowErrorComponent } from "../show-error/show-error.component";
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [ReactiveFormsModule, AlertComponent, MatTableModule, MatSortModule, ShowErrorComponent, MatPaginatorModule, MatSort, SpinnerComponent],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Add '!' after paginator
  displayedColumns: string[] = ['name', 'edit', 'delete'];
  isAlertVisible: boolean = false; // Control alert visibility
  selectedElementId: string = ""; // Hold the selected element ID
  @ViewChild(MatSort) sort!: MatSort;
  private _liveAnnouncer = inject(LiveAnnouncer);
  dataSource = new MatTableDataSource<Location>(undefined); // Data source for the table
  group_form: FormGroup; // Form group for add/edit functionality
  currenL_location = new Location("", ""); // Current location being edited
  Is_Show_Form: number = 0; // Controls the visibility of the form
  isLoading = true;

  // Declare displayedColumns property

  constructor(private location_s: LocationService, private fb: FormBuilder) {
    // Initialize form group
    this.group_form = this.fb.group({
      name: ['', [Validators.minLength(2), Validators.required]]
    });
  }

  // Observable for data
  data$: Observable<Location[]> = this.location_s.data$;
  form_group= this.fb.group(
    {
      'search':this.fb.control("")
    }
  ) 
  ngOnInit(): void {
    // Subscribe to data updates
    this.data$.subscribe((data: Location[]) => {

      this.dataSource.data = data; // Update data source with fetched data 
  
    if(data.length>0)
     { this.isLoading = false;}
    
    });
  }

  ngAfterViewInit() {
    // Assign MatSort to data source
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openAlert(id: string): void {
    this.selectedElementId = id; // Set the selected ID
    this.isAlertVisible = true; // Show alert
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  Add_Item() {
    // Add new location
    const locationName = this.group_form.get("name")?.value;
    this.location_s.add_location(locationName).subscribe(() => {
      this.group_form.reset(); // Reset form after adding
      this.Is_Show_Form = 0; // Hide form
    });
  }

  Edit_Item() {
    // Edit existing location
    const locationName = this.group_form.get("name")?.value;
    this.location_s.edite_location(new Location(this.currenL_location.id, locationName)).subscribe(() => {
      this.group_form.reset(); // Reset form after editing
      this.Is_Show_Form = 0; // Hide form
    });
  }

  DeleteItem(id: string) {
    // Delete selected item
    this.location_s.delete_location(id).subscribe(() => {
      // Optionally refresh the data
    });
  }

  handleAlertResponse(response: { confirmed: boolean, id: string }) {
    this.isAlertVisible = false; // Hide alert after response

    if (response.confirmed) {
      console.log('Confirmed for ID:', response.id);
      this.DeleteItem(response.id); // Execute delete if confirmed
    }
  }
  search_location(paginator: MatPaginator) {
    const searchTerm = this.form_group.get('search')?.value?.toLowerCase();

    if (!searchTerm) {
      // אם שדה החיפוש ריק, מאפסים את הפילטר
      this.dataSource.filter = '';
      paginator.firstPage(); // חזרה לעמוד הראשון
      return;
    }

    // חיפוש גלובלי במקור הנתונים
    const filteredData = this.dataSource.data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    if (filteredData.length > 0) {
      // מציאת המיקום של התוצאה הראשונה
      const index = this.dataSource.data.findIndex(
        (item) => item.name.toLowerCase() === filteredData[0].name.toLowerCase()
      );

      // חישוב העמוד שבו נמצאת התוצאה
      const pageIndex = Math.floor(index / paginator.pageSize);

      // עדכון הפילטר והדפדוף לעמוד הנכון
      this.dataSource.filter = searchTerm;
      paginator.pageIndex = pageIndex;
    } else {
      // אם אין תוצאות, ניתן להציג הודעה או פעולה אחרת
      console.log('No results found');
    }
  }

}
