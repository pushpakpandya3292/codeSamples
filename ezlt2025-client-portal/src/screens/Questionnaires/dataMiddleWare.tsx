import {
  Notary_county_name,
  Notary_legal_name,
} from "@/constants/DataMiddleWare";
import { GenderEnum } from "./QuestionnairesCouple/constants";
import {
  CitizenShipEnum,
  EmploymentStatusEnum,
  PronounsEnum,
  TrustEnum,
  TrusteesRealtionEnum,
  TrusteeChildRealtionEnum,
  TrusteeRealtionWithPersonEnum,
  SpringingAuthorizationEnum,
  EndLifeAuthorizationEnum,
  BurialEnum,
  TrusteeChildBothRealtionEnum,
  TrusteeBothRealtionWithPersonEnum,
  DeliveryOptionEnum,
  MailingAddressEnum,
  EstatePlanBinderEnum,
  ShippedToEnum,
  MortgageInsuranceEnum,
  HealthInsuranceEnum,
  MedicareInsuranceEnum,
  RetirementandInvestingPlansEnum,
  SetupIRAEnum,
  GeneralInvestingEnum,
} from "./types";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const formateDateTimeZone = (date: string) => {
  return date ? moment(new Date(date)).format() : "";
};

export function formatDataCouple(param: { [X: string]: any }): {
  [X: string]: any;
} {
  const data = {
    personal_form: {
      trust_type: TrustEnum[param.trust_status],
      trust_name:
        TrustEnum[param.trust_status as keyof typeof TrustEnum] === 2
          ? param.original_trust_name
          : param.complete_trust_name,
      trust_date:
        param.original_trust_date &&
        TrustEnum[param.trust_status as keyof typeof TrustEnum] === 2
          ? formateDateTimeZone(param.original_trust_date)
          : null,
      primary_trustee: {
        first_name: param.primary_trustee_first_name,
        middle_name: param.primary_trustee_middle_name,
        last_name: param.primary_trustee_last_name,
        email: param.primary_trustee_email,
        phone_no: param.primary_trustee_mobile,
        address: param.primary_trustee_address,
        county: param.primary_trustee_county,
        order: 1,
        citizenship_status:
          CitizenShipEnum[
            param.primary_trustee_citizenship as keyof typeof CitizenShipEnum
          ],
        employment_status: "Full Time",
        estimated_annual_income: parseInt("30000"),
        date_of_birth: param.primary_trustee_date_of_birth,
        relation_with_other_trustee:
          TrusteesRealtionEnum[
            param.primary_trustee_secondary_relation as keyof typeof TrusteesRealtionEnum
          ],
        gender: param.primary_trustee_gender,
      },
      secondary_trustee: {
        first_name: param.secondary_trustee_first_name,
        middle_name: param.secondary_trustee_middle_name,
        last_name: param.secondary_trustee_last_name,
        email: param.secondary_trustee_email,
        phone_no: param.secondary_trustee_mobile,
        address: param.secondary_trustee_address,
        county: param.secondary_trustee_county,
        order: 2,
        citizenship_status:
          CitizenShipEnum[
            param.secondary_trustee_citizenship as keyof typeof CitizenShipEnum
          ],
        employment_status: "Full Time",
        estimated_annual_income: parseInt("30000"),
        date_of_birth: param.secondary_trustee_date_of_birth,
        relation_with_other_trustee:
          TrusteesRealtionEnum[
            param.secondary_trustee_primary_relation as keyof typeof TrusteesRealtionEnum
          ],
        gender: param.secondary_trustee_gender,
      },
    },
    people_form: {
      living_children: param.living_childern
        ? param.living_childern_details.map((child: any, index: number) => ({
            id: uuidv4(),
            fullname: child.full_Name,
            date_of_birth: child.date_of_birth,
            email: child.email ? child.email : undefined,
            phone_no: child.mobile ? child.mobile : undefined,
            relation_with_primary_trustee:
              TrusteeChildRealtionEnum[
                child.primary_trustee_child_relation as keyof typeof TrusteeChildRealtionEnum
              ],
            relation_with_secondary_trustee:
              TrusteeChildRealtionEnum[
                child.secondary_trustee_child_relation as keyof typeof TrusteeChildRealtionEnum
              ],
            relation_with_both_trustee:
              TrusteeChildBothRealtionEnum[
                child.secondary_primary_child_relation as keyof typeof TrusteeChildBothRealtionEnum
              ],
            address: child.address,
            children: [child.living_child_children_full_name],
          }))
        : [],
      deceased_children: param.deceased_childern
        ? param.deceased_childern_details.map((child: any, index: number) => ({
            id: uuidv4(),
            fullname: child.full_Name,
            date_of_birth: formateDateTimeZone(child.date_of_birth),
            date_of_decease: formateDateTimeZone(child.date_of_decease),
          }))
        : [],
      primary_trustee_other_children: param.primary_trustee_childern
        ? param.primary_trustee_childern_details.map(
            (child: any, index: number) => ({
              id: uuidv4(),
              fullname: child.full_Name,
              date_of_birth: formateDateTimeZone(child.date_of_birth),
              email: child.email ? child.email : undefined,
              phone_no: child.mobile ? child.mobile : undefined,
              relation_with_trustee:
                TrusteeChildRealtionEnum[
                  child.primary_trustee_child_relation as keyof typeof TrusteeChildRealtionEnum
                ],
            }),
          )
        : [],
      secondary_trustee_other_children: param.secondary_trustee_childern
        ? param.secondary_trustee_childern_details.map(
            (child: any, index: number) => ({
              id: uuidv4(),
              fullname: child.full_Name,
              date_of_birth: formateDateTimeZone(child.date_of_birth),
              email: child.email ? child.email : undefined,
              phone_no: child.mobile ? child.mobile : undefined,
              relation_with_trustee:
                TrusteeChildRealtionEnum[
                  child.secondary_trustee_child_relation as keyof typeof TrusteeChildRealtionEnum
                ],
            }),
          )
        : [],
      primary_successor: {
        id: uuidv4(),
        fullname: param.primary_successor_full_name,
        email: param.primary_successor_email || undefined,
        phone_no: param.primary_successor_phone_number || undefined,
        relation_with_primary_trustee: TrusteeChildRealtionEnum[
          param.primary_trustee_successor_relation as keyof typeof TrusteeChildRealtionEnum
        ]
          ? TrusteeChildRealtionEnum[
              param.primary_trustee_successor_relation as keyof typeof TrusteeChildRealtionEnum
            ]
          : TrusteeRealtionWithPersonEnum[
              param.primary_trustee_successor_relation as keyof typeof TrusteeRealtionWithPersonEnum
            ],
        relation_with_secondary_trustee: TrusteeChildRealtionEnum[
          param.secondary_trustee_successor_relation_primary as keyof typeof TrusteeChildRealtionEnum
        ]
          ? TrusteeChildRealtionEnum[
              param.secondary_trustee_successor_relation_primary as keyof typeof TrusteeChildRealtionEnum
            ]
          : TrusteeRealtionWithPersonEnum[
              param.secondary_trustee_successor_relation_primary as keyof typeof TrusteeRealtionWithPersonEnum
            ],
        relation_with_both_trustee: TrusteeChildBothRealtionEnum[
          param.secondary_primary_successor_relation_primary as keyof typeof TrusteeChildBothRealtionEnum
        ]
          ? TrusteeChildBothRealtionEnum[
              param.secondary_primary_successor_relation_primary as keyof typeof TrusteeChildBothRealtionEnum
            ]
          : TrusteeBothRealtionWithPersonEnum[
              param.secondary_primary_successor_relation_primary as keyof typeof TrusteeBothRealtionWithPersonEnum
            ],
        // relation_with_both_trustee:
        //   TrusteeChildBothRealtionEnum[
        //   param.secondary_primary_child_relation as keyof typeof TrusteeChildBothRealtionEnum
        //   ],
        address: param.primary_successor_address || undefined,
      },
      secondary_successor: {
        id: uuidv4(),
        fullname: param.backup_successor_full_name,
        email: param.backup_successor_email || undefined,
        phone_no: param.backup_successor_phone_number || undefined,
        relation_with_primary_trustee: TrusteeChildRealtionEnum[
          param.backup_trustee_successor_relation as keyof typeof TrusteeChildRealtionEnum
        ]
          ? TrusteeChildRealtionEnum[
              param.backup_trustee_successor_relation as keyof typeof TrusteeChildRealtionEnum
            ]
          : TrusteeRealtionWithPersonEnum[
              param.backup_trustee_successor_relation as keyof typeof TrusteeRealtionWithPersonEnum
            ],
        relation_with_secondary_trustee: TrusteeChildRealtionEnum[
          param.secondary_trustee_successor_relation_backup as keyof typeof TrusteeChildRealtionEnum
        ]
          ? TrusteeChildRealtionEnum[
              param.secondary_trustee_successor_relation_backup as keyof typeof TrusteeChildRealtionEnum
            ]
          : TrusteeRealtionWithPersonEnum[
              param.secondary_trustee_successor_relation_backup as keyof typeof TrusteeRealtionWithPersonEnum
            ],
        relation_with_both_trustee: TrusteeChildBothRealtionEnum[
          param.secondary_primary_successor_relation_backup as keyof typeof TrusteeChildBothRealtionEnum
        ]
          ? TrusteeChildBothRealtionEnum[
              param.secondary_primary_successor_relation_backup as keyof typeof TrusteeChildBothRealtionEnum
            ]
          : TrusteeBothRealtionWithPersonEnum[
              param.secondary_primary_successor_relation_backup as keyof typeof TrusteeBothRealtionWithPersonEnum
            ],
        address: param.backup_successor_address || undefined,
      },
      primary_health_agents: {
        first_agent: {
          id: uuidv4(),
          fullname: param.primary_health_agent_full_name,
          email: param.primary_health_agent_email || undefined,
          phone_no: param.primary_health_agent_phone_number || undefined,
          relation_with_primary_trustee: TrusteeChildRealtionEnum[
            param.primary_trustee_health_agent_relation as keyof typeof TrusteeChildRealtionEnum
          ]
            ? TrusteeChildRealtionEnum[
                param.primary_trustee_health_agent_relation as keyof typeof TrusteeChildRealtionEnum
              ]
            : TrusteeRealtionWithPersonEnum[
                param.primary_trustee_health_agent_relation as keyof typeof TrusteeRealtionWithPersonEnum
              ],
          relation_with_secondary_trustee: TrusteeChildRealtionEnum[
            param.secondary_trustee_health_agent_relation_primary as keyof typeof TrusteeChildRealtionEnum
          ]
            ? TrusteeChildRealtionEnum[
                param.secondary_trustee_health_agent_relation_primary as keyof typeof TrusteeChildRealtionEnum
              ]
            : TrusteeRealtionWithPersonEnum[
                param.secondary_trustee_health_agent_relation_primary as keyof typeof TrusteeRealtionWithPersonEnum
              ],
          relation_with_both_trustee: TrusteeChildBothRealtionEnum[
            param.secondary_primary_health_agent_relation_primary as keyof typeof TrusteeChildBothRealtionEnum
          ]
            ? TrusteeChildBothRealtionEnum[
                param.secondary_primary_health_agent_relation_primary as keyof typeof TrusteeChildBothRealtionEnum
              ]
            : TrusteeBothRealtionWithPersonEnum[
                param.secondary_primary_health_agent_relation_primary as keyof typeof TrusteeBothRealtionWithPersonEnum
              ],
          address: param.primary_health_agent_address || undefined,
        },
        second_agent: {
          id: uuidv4(),
          fullname: param.backup_health_agent_full_name,
          email: param.backup_health_agent_email || undefined,
          phone_no: param.backup_health_agent_phone_number || undefined,
          relation_with_primary_trustee: TrusteeChildRealtionEnum[
            param.backup_trustee_health_agent_relation as keyof typeof TrusteeChildRealtionEnum
          ]
            ? TrusteeChildRealtionEnum[
                param.backup_trustee_health_agent_relation as keyof typeof TrusteeChildRealtionEnum
              ]
            : TrusteeRealtionWithPersonEnum[
                param.backup_trustee_health_agent_relation as keyof typeof TrusteeRealtionWithPersonEnum
              ],
          relation_with_secondary_trustee: TrusteeChildRealtionEnum[
            param.secondary_trustee_health_agent_relation_backup as keyof typeof TrusteeChildRealtionEnum
          ]
            ? TrusteeChildRealtionEnum[
                param.secondary_trustee_health_agent_relation_backup as keyof typeof TrusteeChildRealtionEnum
              ]
            : TrusteeRealtionWithPersonEnum[
                param.secondary_trustee_health_agent_relation_backup as keyof typeof TrusteeRealtionWithPersonEnum
              ],
          relation_with_both_trustee: TrusteeChildBothRealtionEnum[
            param.secondary_primary_health_agent_relation_backup as keyof typeof TrusteeChildBothRealtionEnum
          ]
            ? TrusteeChildBothRealtionEnum[
                param.secondary_primary_health_agent_relation_backup as keyof typeof TrusteeChildBothRealtionEnum
              ]
            : TrusteeBothRealtionWithPersonEnum[
                param.secondary_primary_health_agent_relation_backup as keyof typeof TrusteeBothRealtionWithPersonEnum
              ],
          address: param.backup_health_agent_address || undefined,
        },
      },
      secondary_health_agents: {
        first_agent: {
          id: uuidv4(),
          fullname: param.primary_health_agent_full_name_secondary_trustee,
          email:
            param.primary_health_agent_email_secondary_trustee || undefined,
          phone_no:
            param.primary_health_agent_phone_number_secondary_trustee ||
            undefined,
          relation_with_primary_trustee: TrusteeChildRealtionEnum[
            param.primary_trustee_health_agent_relation_secondary_trustee as keyof typeof TrusteeChildRealtionEnum
          ]
            ? TrusteeChildRealtionEnum[
                param.primary_trustee_health_agent_relation_secondary_trustee as keyof typeof TrusteeChildRealtionEnum
              ]
            : TrusteeRealtionWithPersonEnum[
                param.primary_trustee_health_agent_relation_secondary_trustee as keyof typeof TrusteeRealtionWithPersonEnum
              ],
          relation_with_secondary_trustee: TrusteeChildRealtionEnum[
            param.secondary_trustee_health_agent_relation_primary_secondary_trustee as keyof typeof TrusteeChildRealtionEnum
          ]
            ? TrusteeChildRealtionEnum[
                param.secondary_trustee_health_agent_relation_primary_secondary_trustee as keyof typeof TrusteeChildRealtionEnum
              ]
            : TrusteeRealtionWithPersonEnum[
                param.secondary_trustee_health_agent_relation_primary_secondary_trustee as keyof typeof TrusteeRealtionWithPersonEnum
              ],
          relation_with_both_trustee: TrusteeChildBothRealtionEnum[
            param.secondary_primary_health_agent_relation_primary_secondary_trustee as keyof typeof TrusteeChildBothRealtionEnum
          ]
            ? TrusteeChildBothRealtionEnum[
                param.secondary_primary_health_agent_relation_primary_secondary_trustee as keyof typeof TrusteeChildBothRealtionEnum
              ]
            : TrusteeBothRealtionWithPersonEnum[
                param.secondary_primary_health_agent_relation_primary_secondary_trustee as keyof typeof TrusteeBothRealtionWithPersonEnum
              ],
          address:
            param.primary_health_agent_address_secondary_trustee || undefined,
        },
        second_agent: {
          id: uuidv4(),
          fullname: param.backup_health_agent_full_name_secondary_trustee,
          email: param.backup_health_agent_email_secondary_trustee || undefined,
          phone_no:
            param.backup_health_agent_phone_number_secondary_trustee ||
            undefined,
          relation_with_primary_trustee: TrusteeChildRealtionEnum[
            param.backup_trustee_health_agent_relation_secondary_trustee as keyof typeof TrusteeChildRealtionEnum
          ]
            ? TrusteeChildRealtionEnum[
                param.backup_trustee_health_agent_relation_secondary_trustee as keyof typeof TrusteeChildRealtionEnum
              ]
            : TrusteeRealtionWithPersonEnum[
                param.backup_trustee_health_agent_relation_secondary_trustee as keyof typeof TrusteeRealtionWithPersonEnum
              ],
          relation_with_secondary_trustee: TrusteeChildRealtionEnum[
            param.secondary_trustee_health_agent_relation_backup_secondary_trustee as keyof typeof TrusteeChildRealtionEnum
          ]
            ? TrusteeChildRealtionEnum[
                param.secondary_trustee_health_agent_relation_backup_secondary_trustee as keyof typeof TrusteeChildRealtionEnum
              ]
            : TrusteeRealtionWithPersonEnum[
                param.secondary_trustee_health_agent_relation_backup_secondary_trustee as keyof typeof TrusteeRealtionWithPersonEnum
              ],
          relation_with_both_trustee: TrusteeChildBothRealtionEnum[
            param.secondary_primary_health_agent_relation_backup_secondary_trustee as keyof typeof TrusteeChildBothRealtionEnum
          ]
            ? TrusteeChildBothRealtionEnum[
                param.secondary_primary_health_agent_relation_backup_secondary_trustee as keyof typeof TrusteeChildBothRealtionEnum
              ]
            : TrusteeBothRealtionWithPersonEnum[
                param.secondary_primary_health_agent_relation_backup_secondary_trustee as keyof typeof TrusteeBothRealtionWithPersonEnum
              ],
          address:
            param.backup_health_agent_address_secondary_trustee || undefined,
        },
      },
      primary_financial_agents: {
        first_agent: {
          id: uuidv4(),
          fullname: param.primary_financial_agent_full_name,
          email: param.primary_financial_agent_email || undefined,
          phone_no: param.primary_financial_agent_phone_number || undefined,
          relation_with_primary_trustee: TrusteeChildRealtionEnum[
            param.primary_trustee_financial_agent_relation as keyof typeof TrusteeChildRealtionEnum
          ]
            ? TrusteeChildRealtionEnum[
                param.primary_trustee_financial_agent_relation as keyof typeof TrusteeChildRealtionEnum
              ]
            : TrusteeRealtionWithPersonEnum[
                param.primary_trustee_financial_agent_relation as keyof typeof TrusteeRealtionWithPersonEnum
              ],
          relation_with_secondary_trustee: TrusteeChildRealtionEnum[
            param.secondary_trustee_financial_agent_relation_primary as keyof typeof TrusteeChildRealtionEnum
          ]
            ? TrusteeChildRealtionEnum[
                param.secondary_trustee_financial_agent_relation_primary as keyof typeof TrusteeChildRealtionEnum
              ]
            : TrusteeRealtionWithPersonEnum[
                param.secondary_trustee_financial_agent_relation_primary as keyof typeof TrusteeRealtionWithPersonEnum
              ],
          relation_with_both_trustee: TrusteeChildBothRealtionEnum[
            param.secondary_primary_financial_agent_relation_primary as keyof typeof TrusteeChildBothRealtionEnum
          ]
            ? TrusteeChildBothRealtionEnum[
                param.secondary_primary_financial_agent_relation_primary as keyof typeof TrusteeChildBothRealtionEnum
              ]
            : TrusteeBothRealtionWithPersonEnum[
                param.secondary_primary_financial_agent_relation_primary as keyof typeof TrusteeBothRealtionWithPersonEnum
              ],
          address: param.primary_financial_agent_address || undefined,
        },
        second_agent: {
          id: uuidv4(),
          fullname: param.backup_financial_agent_full_name,
          email: param.backup_financial_agent_email || undefined,
          phone_no: param.backup_financial_agent_phone_number || undefined,
          relation_with_primary_trustee: TrusteeChildRealtionEnum[
            param.backup_trustee_financial_agent_relation as keyof typeof TrusteeChildRealtionEnum
          ]
            ? TrusteeChildRealtionEnum[
                param.backup_trustee_financial_agent_relation as keyof typeof TrusteeChildRealtionEnum
              ]
            : TrusteeRealtionWithPersonEnum[
                param.backup_trustee_financial_agent_relation as keyof typeof TrusteeRealtionWithPersonEnum
              ],
          relation_with_secondary_trustee: TrusteeChildRealtionEnum[
            param.secondary_trustee_financial_agent_relation_backup as keyof typeof TrusteeChildRealtionEnum
          ]
            ? TrusteeChildRealtionEnum[
                param.secondary_trustee_financial_agent_relation_backup as keyof typeof TrusteeChildRealtionEnum
              ]
            : TrusteeRealtionWithPersonEnum[
                param.secondary_trustee_financial_agent_relation_backup as keyof typeof TrusteeRealtionWithPersonEnum
              ],
          relation_with_both_trustee: TrusteeChildBothRealtionEnum[
            param.secondary_primary_financial_agent_relation_backup as keyof typeof TrusteeChildBothRealtionEnum
          ]
            ? TrusteeChildBothRealtionEnum[
                param.secondary_primary_financial_agent_relation_backup as keyof typeof TrusteeChildBothRealtionEnum
              ]
            : TrusteeBothRealtionWithPersonEnum[
                param.secondary_primary_financial_agent_relation_backup as keyof typeof TrusteeBothRealtionWithPersonEnum
              ],
          address: param.backup_financial_agent_address || undefined,
        },
      },
      secondary_financial_agents: {
        first_agent: {
          id: uuidv4(),
          fullname: param.primary_financial_agent_full_name_secondary_trustee,
          email:
            param.primary_financial_agent_email_secondary_trustee || undefined,
          phone_no:
            param.primary_financial_agent_phone_number_secondary_trustee ||
            undefined,
          relation_with_primary_trustee: TrusteeChildRealtionEnum[
            param.primary_trustee_financial_agent_relation_secondary_trustee as keyof typeof TrusteeChildRealtionEnum
          ]
            ? TrusteeChildRealtionEnum[
                param.primary_trustee_financial_agent_relation_secondary_trustee as keyof typeof TrusteeChildRealtionEnum
              ]
            : TrusteeRealtionWithPersonEnum[
                param.primary_trustee_financial_agent_relation_secondary_trustee as keyof typeof TrusteeRealtionWithPersonEnum
              ],
          relation_with_secondary_trustee: TrusteeChildRealtionEnum[
            param.secondary_trustee_financial_agent_relation_primary_secondary_trustee as keyof typeof TrusteeChildRealtionEnum
          ]
            ? TrusteeChildRealtionEnum[
                param.secondary_trustee_financial_agent_relation_primary_secondary_trustee as keyof typeof TrusteeChildRealtionEnum
              ]
            : TrusteeRealtionWithPersonEnum[
                param.secondary_trustee_financial_agent_relation_primary_secondary_trustee as keyof typeof TrusteeRealtionWithPersonEnum
              ],
          relation_with_both_trustee: TrusteeChildBothRealtionEnum[
            param.secondary_primary_financial_agent_relation_primary_secondary_trustee as keyof typeof TrusteeChildBothRealtionEnum
          ]
            ? TrusteeChildBothRealtionEnum[
                param.secondary_primary_financial_agent_relation_primary_secondary_trustee as keyof typeof TrusteeChildBothRealtionEnum
              ]
            : TrusteeBothRealtionWithPersonEnum[
                param.secondary_primary_financial_agent_relation_primary_secondary_trustee as keyof typeof TrusteeBothRealtionWithPersonEnum
              ],
          address:
            param.primary_financial_agent_address_secondary_trustee ||
            undefined,
        },
        second_agent: {
          id: uuidv4(),
          fullname: param.backup_financial_agent_full_name_secondary_trustee,
          email:
            param.backup_financial_agent_email_secondary_trustee || undefined,
          phone_no:
            param.backup_financial_agent_phone_number_secondary_trustee ||
            undefined,
          relation_with_primary_trustee: TrusteeChildRealtionEnum[
            param.backup_trustee_financial_agent_relation_secondary_trustee as keyof typeof TrusteeChildRealtionEnum
          ]
            ? TrusteeChildRealtionEnum[
                param.backup_trustee_financial_agent_relation_secondary_trustee as keyof typeof TrusteeChildRealtionEnum
              ]
            : TrusteeRealtionWithPersonEnum[
                param.backup_trustee_financial_agent_relation_secondary_trustee as keyof typeof TrusteeRealtionWithPersonEnum
              ],
          relation_with_secondary_trustee: TrusteeChildRealtionEnum[
            param.secondary_trustee_financial_agent_relation_backup_secondary_trustee as keyof typeof TrusteeChildRealtionEnum
          ]
            ? TrusteeChildRealtionEnum[
                param.secondary_trustee_financial_agent_relation_backup_secondary_trustee as keyof typeof TrusteeChildRealtionEnum
              ]
            : TrusteeRealtionWithPersonEnum[
                param.secondary_trustee_financial_agent_relation_backup_secondary_trustee as keyof typeof TrusteeRealtionWithPersonEnum
              ],
          relation_with_both_trustee: TrusteeChildBothRealtionEnum[
            param.secondary_primary_financial_agent_relation_backup_secondary_trustee as keyof typeof TrusteeChildBothRealtionEnum
          ]
            ? TrusteeChildBothRealtionEnum[
                param.secondary_primary_financial_agent_relation_backup_secondary_trustee as keyof typeof TrusteeChildBothRealtionEnum
              ]
            : TrusteeBothRealtionWithPersonEnum[
                param.secondary_primary_financial_agent_relation_backup_secondary_trustee as keyof typeof TrusteeBothRealtionWithPersonEnum
              ],
          address:
            param.backup_financial_agent_address_secondary_trustee || undefined,
        },
      },
      guardian: !param.isChildUnderAge
        ? null
        : {
            first_agent: !param.primary_guardian_full_name
              ? null
              : {
                  id: uuidv4(),
                  fullname: param.primary_guardian_full_name,
                  email: param.primary_guardian_email || undefined,
                  phone_no: param.primary_guardian_phone_number || undefined,
                  relation_with_primary_trustee: TrusteeChildRealtionEnum[
                    param.primary_trustee_guardian_relation as keyof typeof TrusteeChildRealtionEnum
                  ]
                    ? TrusteeChildRealtionEnum[
                        param.primary_trustee_guardian_relation as keyof typeof TrusteeChildRealtionEnum
                      ]
                    : TrusteeRealtionWithPersonEnum[
                        param.primary_trustee_guardian_relation as keyof typeof TrusteeRealtionWithPersonEnum
                      ],
                  relation_with_secondary_trustee: TrusteeChildRealtionEnum[
                    param.secondary_trustee_guardian_relation_primary as keyof typeof TrusteeChildRealtionEnum
                  ]
                    ? TrusteeChildRealtionEnum[
                        param.secondary_trustee_guardian_relation_primary as keyof typeof TrusteeChildRealtionEnum
                      ]
                    : TrusteeRealtionWithPersonEnum[
                        param.secondary_trustee_guardian_relation_primary as keyof typeof TrusteeRealtionWithPersonEnum
                      ],
                  relation_with_both_trustee: TrusteeChildBothRealtionEnum[
                    param.secondary_primary_guardian_relation_primary as keyof typeof TrusteeChildBothRealtionEnum
                  ]
                    ? TrusteeChildBothRealtionEnum[
                        param.secondary_primary_guardian_relation_primary as keyof typeof TrusteeChildBothRealtionEnum
                      ]
                    : TrusteeBothRealtionWithPersonEnum[
                        param.secondary_primary_guardian_relation_primary as keyof typeof TrusteeBothRealtionWithPersonEnum
                      ],
                  address: param.primary_guardian_address || undefined,
                },
            second_agent: !param.backup_guardian_full_name
              ? null
              : {
                  id: uuidv4(),
                  fullname: param.backup_guardian_full_name,
                  email: param.backup_guardian_email || undefined,
                  phone_no: param.backup_guardian_phone_number || undefined,
                  relation_with_primary_trustee: TrusteeChildRealtionEnum[
                    param.backup_trustee_guardian_relation as keyof typeof TrusteeChildRealtionEnum
                  ]
                    ? TrusteeChildRealtionEnum[
                        param.backup_trustee_guardian_relation as keyof typeof TrusteeChildRealtionEnum
                      ]
                    : TrusteeRealtionWithPersonEnum[
                        param.backup_trustee_guardian_relation as keyof typeof TrusteeRealtionWithPersonEnum
                      ],
                  relation_with_secondary_trustee: TrusteeChildRealtionEnum[
                    param.secondary_trustee_guardian_relation_backup as keyof typeof TrusteeChildRealtionEnum
                  ]
                    ? TrusteeChildRealtionEnum[
                        param.secondary_trustee_guardian_relation_backup as keyof typeof TrusteeChildRealtionEnum
                      ]
                    : TrusteeRealtionWithPersonEnum[
                        param.secondary_trustee_guardian_relation_backup as keyof typeof TrusteeRealtionWithPersonEnum
                      ],
                  relation_with_both_trustee: TrusteeChildBothRealtionEnum[
                    param.secondary_primary_guardian_relation_backup as keyof typeof TrusteeChildBothRealtionEnum
                  ]
                    ? TrusteeChildBothRealtionEnum[
                        param.secondary_primary_guardian_relation_backup as keyof typeof TrusteeChildBothRealtionEnum
                      ]
                    : TrusteeBothRealtionWithPersonEnum[
                        param.secondary_primary_guardian_relation_backup as keyof typeof TrusteeBothRealtionWithPersonEnum
                      ],
                  address: param.backup_guardian_address || undefined,
                },
          },
    },
    instructions_form: {
      primary_trustee: {
        perform_autopsy: param.perform_autopsy_primary,
        organ_donation: param.organ_donation_primary,
        springing_authorization:
          SpringingAuthorizationEnum[
            param.power_of_attorny_primary as keyof typeof SpringingAuthorizationEnum
          ],
        financial_categories: {
          is_real_estate_transaction:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_real_estate_transaction",
            ).length === 0
              ? false
              : true,
          is_commodities:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_commodities",
            ).length === 0
              ? false
              : true,
          is_insurance_annuities:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_insurance_annuities",
            ).length === 0
              ? false
              : true,
          is_maintenance:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_maintenance",
            ).length === 0
              ? false
              : true,
          is_social_benifit:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_social_benifit",
            ).length === 0
              ? false
              : true,
          is_personal_property:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_personal_property",
            ).length === 0
              ? false
              : true,
          is_banking_financial:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_banking_financial",
            ).length === 0
              ? false
              : true,
          is_estate_trust_benifits:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_estate_trust_benifits",
            ).length === 0
              ? false
              : true,
          is_retirement_plan:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_retirement_plan",
            ).length === 0
              ? false
              : true,
          is_stocks_bonds:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_stocks_bonds",
            ).length === 0
              ? false
              : true,
          is_business_operation:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_business_operation",
            ).length === 0
              ? false
              : true,
          is_claims_litigation:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_claims_litigation",
            ).length === 0
              ? false
              : true,
          is_tax_matters:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_tax_matters",
            ).length === 0
              ? false
              : true,
        },
        life_authorization:
          EndLifeAuthorizationEnum[
            param.health_care_primary as keyof typeof EndLifeAuthorizationEnum
          ],
        situation_categories: {
          is_vegetative_state:
            param.select_all_for_primary_health_decision.filter(
              (item: any) => item.key_name === "is_vegetative_state",
            ).length === 0
              ? false
              : true,
          is_senility:
            param.select_all_for_primary_health_decision.filter(
              (item: any) => item.key_name === "is_senility",
            ).length === 0
              ? false
              : true,
          is_no_cpr:
            param.select_all_for_primary_health_decision.filter(
              (item: any) => item.key_name === "is_no_cpr",
            ).length === 0
              ? false
              : true,
          is_additional_treatment:
            param.select_all_for_primary_health_decision.filter(
              (item: any) => item.key_name === "is_no_additional_treatment",
            ).length === 0
              ? false
              : true,
        },
        burial_decision:
          BurialEnum[
            param.burial_decisions_for_primary as keyof typeof BurialEnum
          ],
        first_wish: param.body_buried_cremated_primary
          ? param.body_buried_cremated_primary
          : null,
        second_wish: param.funeral_service_primary
          ? param.funeral_service_primary
          : null,
        third_wish: param.post_death_arrangement_primary
          ? param.post_death_arrangement_primary
          : null,
      },
      secondary_trustee: {
        perform_autopsy: param.perform_autopsy_secondary,
        organ_donation: param.organ_donation_secondary,
        springing_authorization:
          SpringingAuthorizationEnum[
            param.power_of_attorny_secondary as keyof typeof SpringingAuthorizationEnum
          ],
        financial_categories: {
          is_real_estate_transaction:
            param.select_all_for_secondary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_real_estate_transaction",
            ).length === 0
              ? false
              : true,
          is_commodities:
            param.select_all_for_secondary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_commodities",
            ).length === 0
              ? false
              : true,
          is_insurance_annuities:
            param.select_all_for_secondary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_insurance_annuities",
            ).length === 0
              ? false
              : true,
          is_maintenance:
            param.select_all_for_secondary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_maintenance",
            ).length === 0
              ? false
              : true,
          is_social_benifit:
            param.select_all_for_secondary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_social_benifit",
            ).length === 0
              ? false
              : true,
          is_personal_property:
            param.select_all_for_secondary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_personal_property",
            ).length === 0
              ? false
              : true,
          is_banking_financial:
            param.select_all_for_secondary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_banking_financial",
            ).length === 0
              ? false
              : true,
          is_estate_trust_benifits:
            param.select_all_for_secondary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_estate_trust_benifits",
            ).length === 0
              ? false
              : true,
          is_retirement_plan:
            param.select_all_for_secondary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_retirement_plan",
            ).length === 0
              ? false
              : true,
          is_stocks_bonds:
            param.select_all_for_secondary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_stocks_bonds",
            ).length === 0
              ? false
              : true,
          is_business_operation:
            param.select_all_for_secondary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_business_operation",
            ).length === 0
              ? false
              : true,
          is_claims_litigation:
            param.select_all_for_secondary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_claims_litigation",
            ).length === 0
              ? false
              : true,
          is_tax_matters:
            param.select_all_for_secondary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_tax_matters",
            ).length === 0
              ? false
              : true,
        },
        life_authorization:
          EndLifeAuthorizationEnum[
            param.health_care_secondary as keyof typeof EndLifeAuthorizationEnum
          ],
        situation_categories: {
          is_vegetative_state:
            param.select_all_for_secondary_health_decision.filter(
              (item: any) => item.key_name === "is_vegetative_state",
            ).length === 0
              ? false
              : true,
          is_senility:
            param.select_all_for_secondary_health_decision.filter(
              (item: any) => item.key_name === "is_senility",
            ).length === 0
              ? false
              : true,
          is_no_cpr:
            param.select_all_for_secondary_health_decision.filter(
              (item: any) => item.key_name === "is_no_cpr",
            ).length === 0
              ? false
              : true,
          is_additional_treatment:
            param.select_all_for_secondary_health_decision.filter(
              (item: any) => item.key_name === "is_no_additional_treatment",
            ).length === 0
              ? false
              : true,
        },
        burial_decision:
          BurialEnum[
            param.burial_decisions_for_secondary as keyof typeof BurialEnum
          ],
        first_wish: param.body_buried_cremated_secondary
          ? param.body_buried_cremated_secondary
          : null,
        second_wish: param.funeral_service_secondary
          ? param.funeral_service_secondary
          : null,
        third_wish: param.post_death_arrangement_secondary
          ? param.post_death_arrangement_secondary
          : null,
      },
    },
    officialize_form: {
      shipped_to: param.shipped_to,
      estate_plan_binder: param.estate_plan_binder,
      first_withness_name: param.witness_primary_full_name,
      first_withness_address: param.witness_primary_address,
      second_withness_name: param.witness_secondary_full_name,
      second_withness_address: param.witness_secondary_address,
      delivery_option:
        param.estate_plan_binder == EstatePlanBinderEnum.USPS
          ? DeliveryOptionEnum.SHIP
          : param.estate_plan_binder == EstatePlanBinderEnum.LOCAL &&
            param.shipped_to == ShippedToEnum.PICKUP
          ? DeliveryOptionEnum.PICKUP
          : param.estate_plan_binder == EstatePlanBinderEnum.LOCAL &&
            param.shipped_to == ShippedToEnum.PICKUPNOTARY
          ? DeliveryOptionEnum.PICKUP_NOTARY
          : null,
      is_shipping_address_for_doc:
        param.estate_plan_binder === EstatePlanBinderEnum.USPS &&
        param.shipped_to == ShippedToEnum.ME
          ? param.is_shipping_address_for_doc
          : null,
      shipping_name_for_doc:
        param.estate_plan_binder === EstatePlanBinderEnum.USPS &&
        param.shipped_to == ShippedToEnum.ME
          ? param.shipping_name_for_doc
          : "",
      shipping_address_for_doc:
        param.estate_plan_binder === EstatePlanBinderEnum.USPS &&
        param.shipped_to == ShippedToEnum.ME
          ? param.shipping_address_for_doc
          : null,
      public_office: "1",
      // public_office: param.licensed_notary_public_0fficer_option,
      is_external_public_office: param.notary === "no" ? false : true,
      public_office_name:
        param.licensed_notary_public_0fficer_option === "3"
          ? Notary_legal_name
          : param.notary === "no"
          ? ""
          : param.notary_complete_name,
      public_office_country:
        param.licensed_notary_public_0fficer_option === "3"
          ? Notary_county_name
          : param.notary === "no"
          ? ""
          : param.notary_country_name,
      is_signed_document: param.signing_date === "no" ? false : true,
      signed_date: param.signing_date_field
        ? formateDateTimeZone(param.signing_date_field)
        : null,
      signature: param.e_signature,
    },
    service_form: {
      is_committed: param.fund_your_trust,
      is_quoted: param.quote_for_life_insurance,
      mortgage_insurance:
        MortgageInsuranceEnum[
          param?.mortgage_or_life_Insurance as keyof typeof MortgageInsuranceEnum
        ],
      health_insurance:
        HealthInsuranceEnum[
          param?.health_insurance as keyof typeof HealthInsuranceEnum
        ],
      medicare_insurance:
        MedicareInsuranceEnum[
          param?.medicare_insurance as keyof typeof MedicareInsuranceEnum
        ],
      retirement_and_investing_plan:
        RetirementandInvestingPlansEnum[
          param?.retirement_and_investing_plans as keyof typeof RetirementandInvestingPlansEnum
        ],
      setup_ira: SetupIRAEnum[param?.setupIRA as keyof typeof SetupIRAEnum],
      general_investing:
        GeneralInvestingEnum[
          param?.general_investing as keyof typeof GeneralInvestingEnum
        ],
      other_popular_professional_services: param?.ProfessionalServicesOthers
        ? [...param?.ProfessionalServices, param.ProfessionalServicesOthers]
        : param?.ProfessionalServices,
    },
    estate_form: {
      primary_address: param.primary_home_address,
      residence_detail: param.primary_residence || null,
      property_type : param.property_type_question,
      is_same_address:
        param?.mailing_address_checkbox === MailingAddressEnum.MAILING_ADDRESS,
      mailing_address: param.mailing_address_field,
      quit_claim: param.quit_qlaim || null,
      primary_address_property_detail: param.primary_home_address?.name
        ? {
            propertyAddress: param.primary_home_address?.name,
            propertyType:
              param.primary_home_property_api_details?.siteLocation?.data
                ?.landUseAndZoningCodes?.countyLandUseDescription,
            owner: param.primary_home_property_api_details?.ownership?.data,
            apn: param.primary_home_property_api_details?.legalAndVesting
              ?.assessorsParcelNumber,
            mailingAddress:
              param.primary_home_property_api_details?.ownership?.data
                ?.currentOwnerMailingInfo?.mailingAddress?.streetAddress,
            countyName:
              param.primary_home_property_api_details?.legalAndVesting
                ?.countyName,
            vesting:
              param.primary_home_property_api_details?.legalAndVesting
                ?.ownerVestingCode,
            vestingOwnerShip:
              param.primary_home_property_api_details?.legalAndVesting
                ?.vestingOwnershipRight,
            description:
              param.primary_home_property_api_details?.legalAndVesting
                ?.shortLegalDescription,
          }
        : null,
      primary_address_questions: param.property_question,
      investment_properties: param.investment_properties?.map(
        (property: any, index: number) => ({
          id: uuidv4(),
          primary_address: property.investment_property_primary_home_address,
          is_same_address:
            param?.mailing_address_checkbox ===
            MailingAddressEnum.MAILING_ADDRESS,
          mailing_address: param.mailing_address_field,
          residence_detail: property.property_ownership_status || null,
          property_detail: property.investment_property_primary_home_address
            ?.name
            ? {
                propertyAddress:
                  property.investment_property_primary_home_address?.name,
                propertyType:
                  property.property_api_details?.siteLocation?.data
                    ?.landUseAndZoningCodes?.countyLandUseDescription,
                owner: property?.property_api_details?.ownership?.data,
                apn: property.property_api_details?.legalAndVesting
                  ?.assessorsParcelNumber,
                mailingAddress:
                  property?.property_api_details?.ownership?.data
                    ?.currentOwnerMailingInfo?.mailingAddress?.streetAddress,
                countyName:
                  property.property_api_details?.legalAndVesting?.countyName,
                vesting:
                  property.property_api_details?.legalAndVesting
                    ?.ownerVestingCode,
                vestingOwnerShip:
                  property.property_api_details?.legalAndVesting
                    ?.vestingOwnershipRight,
                description:
                  property.property_api_details?.legalAndVesting
                    ?.shortLegalDescription,
              }
            : null,
          property_address_questions: property.property_question,
        }),
      ),
      trustee_responsibility_desc: param.trustee_responsibility,
      trustee_responsibility_minimum_age:
        param.trustee_responsibility_minimum_age,
      division_assets_desc: param.property_division,
      gift_charity_desc: param.gifts_to_other_people,
      debts_loans_desc: param.debts_or_loans,
      retirements_investment_desc: param.retirement_and_insurance,
      business_social_desc: param.businesses_and_social_media,
      wishes_pets_desc: param.wishes_for_pets,
      trustee_compensation_desc: param.trustee_compensation,
      anything_to_add_desc: param.additional,
    },
  };

  return data;
}

export function formatDataSingle(param: { [X: string]: any }): {
  [X: string]: any;
} {
  const data = {
    personal_form: {
      trust_type: TrustEnum[param.trust_status],
      trust_name:
        TrustEnum[param.trust_status as keyof typeof TrustEnum] === 2
          ? param.original_trust_name
          : param.complete_trust_name,
      trust_date:
        param.original_trust_date &&
        TrustEnum[param.trust_status as keyof typeof TrustEnum] === 2
          ? formateDateTimeZone(param.original_trust_date)
          : null,
      primary_trustee: {
        first_name: param.primary_trustee_first_name,
        middle_name: param.primary_trustee_middle_name,
        last_name: param.primary_trustee_last_name,
        email: param.primary_trustee_email,
        phone_no: param.primary_trustee_mobile,
        address: param.primary_trustee_address,
        county: param.primary_trustee_county,
        order: 1,
        citizenship_status:
          CitizenShipEnum[
            param.primary_trustee_citizenship as keyof typeof CitizenShipEnum
          ],
        employment_status: "Full Time",
        // EmploymentStatusEnum[
        //   param.primary_trustee_empolyment_status as keyof typeof EmploymentStatusEnum
        // ],
        date_of_birth: param.primary_trustee_date_of_birth,
        estimated_annual_income: parseInt("30000"),

        // param.primary_trustee_estimated_annual_income?.replaceAll(",", ""),
        // pronoun:
        //   PronounsEnum[
        //   param.primary_trustee_pronouns_relation as keyof typeof PronounsEnum
        //   ],
        relation_with_other_trustee:
          TrusteesRealtionEnum[
            param.primary_trustee_secondary_relation as keyof typeof TrusteesRealtionEnum
          ],
        gender: param.primary_trustee_gender,
      },
    },
    people_form: {
      living_children: param.living_childern
        ? param.living_childern_details.map((child: any, index: number) => ({
            id: uuidv4(),
            fullname: child.full_Name,
            date_of_birth: child.date_of_birth,
            email: child.email ? child.email : undefined,
            phone_no: child.mobile ? child.mobile : undefined,
            relation_with_primary_trustee:
              TrusteeChildRealtionEnum[
                child.primary_trustee_child_relation as keyof typeof TrusteeChildRealtionEnum
              ],
            address: child.address,
            children: [child.living_child_children_full_name],
          }))
        : [],
      deceased_children: param.deceased_childern
        ? param.deceased_childern_details.map((child: any, index: number) => ({
            id: uuidv4(),
            fullname: child.full_Name,
            date_of_birth: formateDateTimeZone(child.date_of_birth),
            date_of_decease: formateDateTimeZone(child.date_of_decease),
          }))
        : [],
      primary_successor: {
        id: uuidv4(),
        fullname: param.primary_successor_full_name,
        email: param.primary_successor_email || undefined,
        phone_no: param.primary_successor_phone_number || undefined,
        relation_with_primary_trustee: TrusteeChildRealtionEnum[
          param.primary_trustee_successor_relation as keyof typeof TrusteeChildRealtionEnum
        ]
          ? TrusteeChildRealtionEnum[
              param.primary_trustee_successor_relation as keyof typeof TrusteeChildRealtionEnum
            ]
          : TrusteeRealtionWithPersonEnum[
              param.primary_trustee_successor_relation as keyof typeof TrusteeRealtionWithPersonEnum
            ],
        address: param.primary_successor_address,
      },
      secondary_successor: {
        id: uuidv4(),
        fullname: param.backup_successor_full_name,
        email: param.backup_successor_email || undefined,
        phone_no: param.backup_successor_phone_number || undefined,
        relation_with_primary_trustee: TrusteeChildRealtionEnum[
          param.backup_trustee_successor_relation as keyof typeof TrusteeChildRealtionEnum
        ]
          ? TrusteeChildRealtionEnum[
              param.backup_trustee_successor_relation as keyof typeof TrusteeChildRealtionEnum
            ]
          : TrusteeRealtionWithPersonEnum[
              param.backup_trustee_successor_relation as keyof typeof TrusteeRealtionWithPersonEnum
            ],
        address: param.backup_successor_address,
      },
      primary_health_agents: {
        first_agent: {
          id: uuidv4(),
          fullname: param.primary_health_agent_full_name,
          email: param.primary_health_agent_email || undefined,
          phone_no: param.primary_health_agent_phone_number || undefined,
          relation_with_primary_trustee: TrusteeChildRealtionEnum[
            param.primary_trustee_health_agent_relation as keyof typeof TrusteeChildRealtionEnum
          ]
            ? TrusteeChildRealtionEnum[
                param.primary_trustee_health_agent_relation as keyof typeof TrusteeChildRealtionEnum
              ]
            : TrusteeRealtionWithPersonEnum[
                param.primary_trustee_health_agent_relation as keyof typeof TrusteeRealtionWithPersonEnum
              ],
          address: param.primary_health_agent_address,
        },
        second_agent: {
          id: uuidv4(),
          fullname: param.backup_health_agent_full_name,
          email: param.backup_health_agent_email || undefined,
          phone_no: param.backup_health_agent_phone_number || undefined,
          relation_with_primary_trustee: TrusteeChildRealtionEnum[
            param.backup_trustee_health_agent_relation as keyof typeof TrusteeChildRealtionEnum
          ]
            ? TrusteeChildRealtionEnum[
                param.backup_trustee_health_agent_relation as keyof typeof TrusteeChildRealtionEnum
              ]
            : TrusteeRealtionWithPersonEnum[
                param.backup_trustee_health_agent_relation as keyof typeof TrusteeRealtionWithPersonEnum
              ],
          address: param.backup_health_agent_address,
        },
      },
      primary_financial_agents: {
        first_agent: {
          id: uuidv4(),
          fullname: param.primary_financial_agent_full_name,
          email: param.primary_financial_agent_email || undefined,
          phone_no: param.primary_financial_agent_phone_number || undefined,
          relation_with_primary_trustee: TrusteeChildRealtionEnum[
            param.primary_trustee_financial_agent_relation as keyof typeof TrusteeChildRealtionEnum
          ]
            ? TrusteeChildRealtionEnum[
                param.primary_trustee_financial_agent_relation as keyof typeof TrusteeChildRealtionEnum
              ]
            : TrusteeRealtionWithPersonEnum[
                param.primary_trustee_financial_agent_relation as keyof typeof TrusteeRealtionWithPersonEnum
              ],
          address: param.primary_financial_agent_address,
        },
        second_agent: {
          id: uuidv4(),
          fullname: param.backup_financial_agent_full_name,
          email: param.backup_financial_agent_email || undefined,
          phone_no: param.backup_financial_agent_phone_number || undefined,
          relation_with_primary_trustee: TrusteeChildRealtionEnum[
            param.backup_trustee_financial_agent_relation as keyof typeof TrusteeChildRealtionEnum
          ]
            ? TrusteeChildRealtionEnum[
                param.backup_trustee_financial_agent_relation as keyof typeof TrusteeChildRealtionEnum
              ]
            : TrusteeRealtionWithPersonEnum[
                param.backup_trustee_financial_agent_relation as keyof typeof TrusteeRealtionWithPersonEnum
              ],
          address: param.backup_financial_agent_address,
        },
      },
      guardian: !param.isChildUnderAge
        ? null
        : {
            first_agent: !param.primary_guardian_full_name
              ? null
              : {
                  id: uuidv4(),
                  fullname: param.primary_guardian_full_name,
                  email: param.primary_guardian_email || undefined,
                  phone_no: param.primary_guardian_phone_number || undefined,
                  relation_with_primary_trustee: TrusteeChildRealtionEnum[
                    param.primary_trustee_guardian_relation as keyof typeof TrusteeChildRealtionEnum
                  ]
                    ? TrusteeChildRealtionEnum[
                        param.primary_trustee_guardian_relation as keyof typeof TrusteeChildRealtionEnum
                      ]
                    : TrusteeRealtionWithPersonEnum[
                        param.primary_trustee_guardian_relation as keyof typeof TrusteeRealtionWithPersonEnum
                      ],
                  address: param.primary_guardian_address,
                },
            second_agent: !param.backup_guardian_full_name
              ? null
              : {
                  id: uuidv4(),
                  fullname: param.backup_guardian_full_name,
                  email: param.backup_guardian_email || undefined,
                  phone_no: param.backup_guardian_phone_number || undefined,
                  relation_with_primary_trustee: TrusteeChildRealtionEnum[
                    param.backup_trustee_guardian_relation as keyof typeof TrusteeChildRealtionEnum
                  ]
                    ? TrusteeChildRealtionEnum[
                        param.backup_trustee_guardian_relation as keyof typeof TrusteeChildRealtionEnum
                      ]
                    : TrusteeRealtionWithPersonEnum[
                        param.backup_trustee_guardian_relation as keyof typeof TrusteeRealtionWithPersonEnum
                      ],
                  address: param.backup_guardian_address,
                },
          },
    },
    instructions_form: {
      primary_trustee: {
        perform_autopsy: param.perform_autopsy_primary,
        organ_donation: param.organ_donation_primary,
        springing_authorization:
          SpringingAuthorizationEnum[
            param.power_of_attorny_primary as keyof typeof SpringingAuthorizationEnum
          ],
        financial_categories: {
          is_real_estate_transaction:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_real_estate_transaction",
            ).length === 0
              ? false
              : true,
          is_commodities:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_commodities",
            ).length === 0
              ? false
              : true,
          is_insurance_annuities:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_insurance_annuities",
            ).length === 0
              ? false
              : true,
          is_maintenance:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_maintenance",
            ).length === 0
              ? false
              : true,
          is_social_benifit:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_social_benifit",
            ).length === 0
              ? false
              : true,
          is_personal_property:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_personal_property",
            ).length === 0
              ? false
              : true,
          is_banking_financial:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_banking_financial",
            ).length === 0
              ? false
              : true,
          is_estate_trust_benifits:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_estate_trust_benifits",
            ).length === 0
              ? false
              : true,
          is_retirement_plan:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_retirement_plan",
            ).length === 0
              ? false
              : true,
          is_stocks_bonds:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_stocks_bonds",
            ).length === 0
              ? false
              : true,
          is_business_operation:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_business_operation",
            ).length === 0
              ? false
              : true,
          is_claims_litigation:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_claims_litigation",
            ).length === 0
              ? false
              : true,
          is_tax_matters:
            param.select_all_for_primary_power_of_attorney.filter(
              (item: any) => item.key_name === "is_tax_matters",
            ).length === 0
              ? false
              : true,
        },
        life_authorization:
          EndLifeAuthorizationEnum[
            param.health_care_primary as keyof typeof EndLifeAuthorizationEnum
          ],
        situation_categories: {
          is_vegetative_state:
            param.select_all_for_primary_health_decision.filter(
              (item: any) => item.key_name === "is_vegetative_state",
            ).length === 0
              ? false
              : true,
          is_senility:
            param.select_all_for_primary_health_decision.filter(
              (item: any) => item.key_name === "is_senility",
            ).length === 0
              ? false
              : true,
          is_no_cpr:
            param.select_all_for_primary_health_decision.filter(
              (item: any) => item.key_name === "is_no_cpr",
            ).length === 0
              ? false
              : true,
          is_additional_treatment:
            param.select_all_for_primary_health_decision.filter(
              (item: any) => item.key_name === "is_no_additional_treatment",
            ).length === 0
              ? false
              : true,
        },
        burial_decision:
          BurialEnum[
            param.burial_decisions_for_primary as keyof typeof BurialEnum
          ],
        first_wish: param.body_buried_cremated_primary
          ? param.body_buried_cremated_primary
          : null,
        second_wish: param.funeral_service_primary
          ? param.funeral_service_primary
          : null,
        third_wish: param.post_death_arrangement_primary
          ? param.post_death_arrangement_primary
          : null,
      },
    },
    officialize_form: {
      shipped_to: param.shipped_to,
      estate_plan_binder: param.estate_plan_binder,
      first_withness_name: param.witness_primary_full_name,
      first_withness_address: param.witness_primary_address,
      second_withness_name: param.witness_secondary_full_name,
      second_withness_address: param.witness_secondary_address,
      delivery_option:
        param.estate_plan_binder == EstatePlanBinderEnum.USPS
          ? DeliveryOptionEnum.SHIP
          : param.estate_plan_binder == EstatePlanBinderEnum.LOCAL &&
            param.shipped_to == ShippedToEnum.PICKUP
          ? DeliveryOptionEnum.PICKUP
          : param.estate_plan_binder == EstatePlanBinderEnum.LOCAL &&
            param.shipped_to == ShippedToEnum.PICKUPNOTARY
          ? DeliveryOptionEnum.PICKUP_NOTARY
          : null,
      is_shipping_address_for_doc:
        param.estate_plan_binder === EstatePlanBinderEnum.USPS &&
        param.shipped_to == ShippedToEnum.ME
          ? param.is_shipping_address_for_doc
          : null,
      shipping_name_for_doc:
        param.estate_plan_binder === EstatePlanBinderEnum.USPS &&
        param.shipped_to == ShippedToEnum.ME
          ? param.shipping_name_for_doc
          : "",
      shipping_address_for_doc:
        param.estate_plan_binder === EstatePlanBinderEnum.USPS &&
        param.shipped_to == ShippedToEnum.ME
          ? param.shipping_address_for_doc
          : null,
      public_office: "1",
      // public_office: param.licensed_notary_public_0fficer_option,
      is_external_public_office: param.notary === "no" ? false : true,
      public_office_name:
        param.licensed_notary_public_0fficer_option === "3"
          ? Notary_legal_name
          : param.notary === "no"
          ? ""
          : param.notary_complete_name,
      public_office_country:
        param.licensed_notary_public_0fficer_option === "3"
          ? Notary_county_name
          : param.notary === "no"
          ? ""
          : param.notary_country_name,
      is_signed_document: param.signing_date === "no" ? false : true,
      signed_date: param.signing_date_field
        ? formateDateTimeZone(param.signing_date_field)
        : null,
      signature: param.e_signature,
    },
    service_form: {
      is_committed: param.fund_your_trust,
      is_quoted: param.quote_for_life_insurance,
      mortgage_insurance:
        MortgageInsuranceEnum[
          param?.mortgage_or_life_Insurance as keyof typeof MortgageInsuranceEnum
        ],
      health_insurance:
        HealthInsuranceEnum[
          param?.health_insurance as keyof typeof HealthInsuranceEnum
        ],
      medicare_insurance:
        MedicareInsuranceEnum[
          param?.medicare_insurance as keyof typeof MedicareInsuranceEnum
        ],
      retirement_and_investing_plan:
        RetirementandInvestingPlansEnum[
          param?.retirement_and_investing_plans as keyof typeof RetirementandInvestingPlansEnum
        ],
      setup_ira: SetupIRAEnum[param?.setupIRA as keyof typeof SetupIRAEnum],
      general_investing:
        GeneralInvestingEnum[
          param?.general_investing as keyof typeof GeneralInvestingEnum
        ],
      other_popular_professional_services: param?.ProfessionalServicesOthers
        ? [...param?.ProfessionalServices, param.ProfessionalServicesOthers]
        : param?.ProfessionalServices,
    },
    estate_form: {
      primary_address: param.primary_home_address,
      residence_detail: param.primary_residence || null,
      property_type : param.property_type_question,
      is_same_address:
        param?.mailing_address_checkbox === MailingAddressEnum.MAILING_ADDRESS,
      mailing_address: param.mailing_address_field,
      quit_claim: param.quit_qlaim || null,
      primary_address_property_detail: param?.primary_home_address?.name
        ? {
            propertyAddress: param?.primary_home_address?.name,
            propertyType:
              param.primary_home_property_api_details?.siteLocation?.data
                ?.landUseAndZoningCodes?.countyLandUseDescription,
            owner: param.primary_home_property_api_details?.ownership?.data,
            apn: param.primary_home_property_api_details?.legalAndVesting
              ?.assessorsParcelNumber,
            mailingAddress:
              param.primary_home_property_api_details?.ownership?.data
                ?.currentOwnerMailingInfo?.mailingAddress?.streetAddress,
            countyName:
              param.primary_home_property_api_details?.legalAndVesting
                ?.countyName,
            vesting:
              param.primary_home_property_api_details?.legalAndVesting
                ?.ownerVestingCode,
            vestingOwnerShip:
              param.primary_home_property_api_details?.legalAndVesting
                ?.vestingOwnershipRight,
            description:
              param.primary_home_property_api_details?.legalAndVesting
                ?.shortLegalDescription,
          }
        : null,
      primary_address_questions: param.property_question,
      investment_properties: param.investment_properties?.map(
        (property: any, index: number) => ({
          id: uuidv4(),
          primary_address: property.investment_property_primary_home_address,
          is_same_address:
            param?.mailing_address_checkbox ===
            MailingAddressEnum.MAILING_ADDRESS,
          mailing_address: param.mailing_address_field,
          residence_detail: property.property_ownership_status || null,
          property_detail: property?.investment_property_primary_home_address
            ?.name
            ? {
                propertyAddress:
                  property?.investment_property_primary_home_address?.name,
                propertyType:
                  property.property_api_details?.siteLocation?.data
                    ?.landUseAndZoningCodes?.countyLandUseDescription,
                owner: property.property_api_details?.ownership?.data,
                apn: property.property_api_details?.legalAndVesting
                  ?.assessorsParcelNumber,
                mailingAddress:
                  property.property_api_details?.ownership?.data
                    ?.currentOwnerMailingInfo?.mailingAddress?.streetAddress,
                countyName:
                  property.property_api_details?.legalAndVesting?.countyName,
                vesting:
                  property.property_api_details?.legalAndVesting
                    ?.ownerVestingCode,
                vestingOwnerShip:
                  property.property_api_details?.legalAndVesting
                    ?.vestingOwnershipRight,
                description:
                  property.property_api_details?.legalAndVesting
                    ?.shortLegalDescription,
              }
            : null,
          property_address_questions: property.property_question,
        }),
      ),
      trustee_responsibility_desc: param.trustee_responsibility,
      trustee_responsibility_minimum_age:
        param.trustee_responsibility_minimum_age,
      division_assets_desc: param.property_division,
      gift_charity_desc: param.gifts_to_other_people,
      debts_loans_desc: param.debts_or_loans,
      retirements_investment_desc: param.retirement_and_insurance,
      business_social_desc: param.businesses_and_social_media,
      wishes_pets_desc: param.wishes_for_pets,
      trustee_compensation_desc: param.trustee_compensation,
      anything_to_add_desc: param.additional,
    },
  };

  return data;
}
