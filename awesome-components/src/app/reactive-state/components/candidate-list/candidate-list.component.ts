import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CandidatesService } from '../../services/candidate.service';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { Candidate } from '../../models/candidates.model';
import { SharedModule } from '../../../shared/shared.module';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CandidateSearchType } from '../../enum/candidate-search-type.enum';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [SharedModule, RouterLink, ReactiveFormsModule],
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
}) export class CandidateListComponent implements OnInit {


  loading$!: Observable<boolean>;
  candidates$!: Observable<Candidate[]>

  searchCtrl!: FormControl;
  searchTypeCtrl!: FormControl;

  searchTypeOptions!: {
    value: CandidateSearchType,
    label: string
  }[];

  constructor(private candidatesService: CandidatesService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.initObservables();
    this.candidatesService.getCandidatesFromServer();
  }
  initForm() {
    this.searchCtrl = this.formBuilder.control('');
    this.searchTypeCtrl = this.formBuilder.control(CandidateSearchType.LASTNAME);
    this.searchTypeOptions = [
      { value: CandidateSearchType.LASTNAME, label: 'Nom' },
      { value: CandidateSearchType.FIRSTNAME, label: 'Prénom' },
      { value: CandidateSearchType.COMPANY, label: 'Entreprise' }
    ];
  }

  initObservables() {
    this.loading$ = this.candidatesService.loading$;

    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map(value => value.toLowerCase())
    );
    const searchType$: Observable<CandidateSearchType> = this.searchTypeCtrl.valueChanges.pipe(
      startWith(this.searchTypeCtrl.value)
    );
    
    this.candidates$ = combineLatest([
      search$,
      searchType$,
      this.candidatesService.candidates$
    ]
    ).pipe(
      map(([search, searchType, candidates]) => candidates.filter(candidate => candidate[searchType]
        .toLowerCase()
        .includes(search as string))
      )
    );


  }


}
