import { NgModule } from '@angular/core';
import 'hammerjs';

import { MatInputModule, MatButtonModule, MatButtonToggleModule,
          MatCheckboxModule, MatRadioModule,
          MatSelectModule, MatAutocompleteModule,
          MatCardModule, MatListModule, MatTabsModule,
          MatMenuModule, MatSidenavModule, MatToolbarModule,
          MatIconModule, MatChipsModule,
          MatDialogModule, MatSnackBarModule } from '@angular/material';

@NgModule({
  imports: [
    // Material
    MatInputModule, MatButtonModule, MatButtonToggleModule,
    MatCheckboxModule, MatRadioModule,
    MatSelectModule, MatAutocompleteModule,
    MatCardModule, MatListModule, MatTabsModule,
    MatMenuModule, MatSidenavModule, MatToolbarModule,
    MatIconModule, MatChipsModule,
    MatDialogModule, MatSnackBarModule
  ],
  exports:  [ MatInputModule, MatButtonModule, MatButtonToggleModule,
              MatCheckboxModule, MatRadioModule,
              MatSelectModule, MatAutocompleteModule,
              MatCardModule, MatListModule, MatTabsModule,
              MatMenuModule, MatSidenavModule, MatToolbarModule,
              MatIconModule, MatChipsModule,
              MatDialogModule, MatSnackBarModule ]
})
export class SharedMaterialModule { }
