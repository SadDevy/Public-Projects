using System;
using System.Collections.Generic;

#nullable disable

namespace TestWebAPI.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public DateTime RegestrationDate { get; set; }
        public DateTime LastActivityDate { get; set; }
    }
}
